<?php

namespace Tests\Feature\BusinessAdvisors;

use App\Enums\CatalogReviewStatus;
use App\Enums\PrivacyRequestStatus;
use App\Enums\PrivacyRequestType;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\BusinessAdvisorPrivacyRequest;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use App\Services\BusinessAdvisors\AttachBusinessAdvisor;
use App\Services\BusinessAdvisors\MergeEntities;
use App\Services\BusinessAdvisors\NameNormalizer;
use App\Services\BusinessAdvisors\VerifyEntity;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class BusinessAdvisorCatalogTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
        Mail::fake();
    }

    public function test_guest_public_show_excludes_business_advisor(): void
    {
        $repo = Repository::factory()->create(['is_public' => true]);
        RepositoryBusinessAdvisor::factory()->create([
            'repository_id' => $repo->id,
        ]);

        $this->get(route('repositories.show', $repo))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('public/repositories/show')
                ->where('repository.business_advisor', null));
    }

    public function test_attach_reuses_company_and_keeps_snapshot_immutable_after_catalog_change(): void
    {
        $user = User::factory()->create();
        $user->assignRole('teacher');
        $repo = Repository::factory()->create();
        $repo->users()->attach($user->id);

        $assignment = app(AttachBusinessAdvisor::class)->handle($repo, $user, [
            'advisor' => [
                'first_name' => 'Juan',
                'last_name' => 'Perez',
            ],
            'company' => [
                'name' => 'Empresa B',
            ],
            'affiliation' => [
                'email' => 'juan@empresab.com',
                'job_title' => 'Gerente de TI',
            ],
            'send_confirmation' => false,
        ]);

        $this->assertSame('Gerente de TI', $assignment->snapshot['job_title']);
        $this->assertDatabaseCount('business_advisors', 1);
        $this->assertDatabaseCount('companies', 1);

        $advisor = BusinessAdvisor::query()->firstOrFail();
        $affiliation = BusinessAdvisorAffiliation::query()->firstOrFail();
        $affiliation->update(['job_title' => 'Director']);

        $assignment->refresh();
        $this->assertSame('Gerente de TI', $assignment->snapshot['job_title']);
        $this->assertSame($advisor->id, $assignment->business_advisor_id);
    }

    public function test_search_excludes_foreign_pending_and_requires_min_chars(): void
    {
        $viewer = User::factory()->create();
        $viewer->assignRole('teacher');
        $other = User::factory()->create();

        BusinessAdvisor::factory()->verified()->create([
            'first_name' => 'Maria',
            'last_name' => 'Lopez',
            'name_normalized' => NameNormalizer::normalizePersonName('Maria', 'Lopez'),
        ]);
        BusinessAdvisor::factory()->create([
            'first_name' => 'Pedro',
            'last_name' => 'Pending',
            'name_normalized' => NameNormalizer::normalizePersonName('Pedro', 'Pending'),
            'created_by' => $other->id,
            'status' => CatalogReviewStatus::PendingReview->value,
        ]);

        $this->actingAs($viewer)
            ->getJson(route('business-advisors.search', ['q' => 'ma']))
            ->assertOk()
            ->assertJsonCount(0, 'data');

        $this->actingAs($viewer)
            ->getJson(route('business-advisors.search', ['q' => 'mar']))
            ->assertOk()
            ->assertJsonCount(1, 'data');
    }

    public function test_creator_cannot_verify_own_pending_record(): void
    {
        $creator = User::factory()->create();
        $creator->assignRole('teacher');
        $advisor = BusinessAdvisor::factory()->create([
            'created_by' => $creator->id,
            'status' => CatalogReviewStatus::PendingReview->value,
        ]);

        $this->actingAs($creator)
            ->post(route('business-advisors.verify', $advisor))
            ->assertForbidden();
    }

    public function test_merge_advisors_reasigns_without_changing_snapshots(): void
    {
        $actor = User::factory()->create();
        $actor->assignRole('director');

        $source = BusinessAdvisor::factory()->create();
        $target = BusinessAdvisor::factory()->create();
        $company = Company::factory()->create();
        $affiliation = BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $source->id,
            'company_id' => $company->id,
        ]);
        $assignment = RepositoryBusinessAdvisor::factory()->create([
            'business_advisor_id' => $source->id,
            'business_advisor_affiliation_id' => $affiliation->id,
            'company_id' => $company->id,
            'snapshot' => [
                'first_name' => 'Legacy',
                'last_name' => 'Name',
                'job_title' => 'Old title',
            ],
        ]);

        app(MergeEntities::class)->mergeAdvisors($source, $target, $actor);

        $this->assertSame(CatalogReviewStatus::Merged, $source->fresh()->status);
        $this->assertSame($target->id, $affiliation->fresh()->business_advisor_id);
        $this->assertSame($target->id, $assignment->fresh()->business_advisor_id);
        $this->assertSame('Old title', $assignment->fresh()->snapshot['job_title']);
    }

    public function test_verify_affiliation_closes_previous_same_company(): void
    {
        $verifier = User::factory()->create();
        $verifier->assignRole('director');
        $creator = User::factory()->create();

        $advisor = BusinessAdvisor::factory()->create(['created_by' => $creator->id]);
        $company = Company::factory()->create();
        $old = BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $advisor->id,
            'company_id' => $company->id,
            'starts_at' => now()->subMonth()->toDateString(),
            'ends_at' => null,
            'created_by' => $creator->id,
        ]);
        $new = BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $advisor->id,
            'company_id' => $company->id,
            'starts_at' => now()->toDateString(),
            'ends_at' => null,
            'status' => CatalogReviewStatus::PendingReview->value,
            'created_by' => $creator->id,
        ]);

        app(VerifyEntity::class)->verify($new, $verifier);

        $this->assertNotNull($old->fresh()->ends_at);
        $this->assertSame(CatalogReviewStatus::Verified, $new->fresh()->status);
    }

    public function test_duplicates_endpoint_suggests_matching_person(): void
    {
        $user = User::factory()->create();
        $user->assignRole('teacher');
        $company = Company::factory()->create();
        $advisor = BusinessAdvisor::factory()->verified()->create([
            'first_name' => 'Ana',
            'last_name' => 'Ruiz',
            'name_normalized' => NameNormalizer::normalizePersonName('Ana', 'Ruiz'),
        ]);
        BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $advisor->id,
            'company_id' => $company->id,
            'email' => 'ana.ruiz@example.com',
        ]);

        $this->actingAs($user)
            ->postJson(route('business-advisors.duplicates'), [
                'first_name' => 'Ana',
                'last_name' => 'Ruiz',
                'email' => 'ana.ruiz@example.com',
            ])
            ->assertOk()
            ->assertJsonFragment(['id' => $advisor->id, 'reason' => 'same_email']);
    }

    public function test_director_can_export_contacts_and_manage_privacy_requests(): void
    {
        $director = User::factory()->create();
        $director->assignRole('director');
        $advisor = BusinessAdvisor::factory()->verified()->create();
        BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $advisor->id,
            'email' => 'contacto@empresa.test',
        ]);

        $this->actingAs($director)
            ->get(route('business-advisors.export'))
            ->assertOk()
            ->assertHeader('content-disposition');

        $this->actingAs($director)
            ->post(route('business-advisors.privacy-requests.store'), [
                'business_advisor_id' => $advisor->id,
                'type' => PrivacyRequestType::Access->value,
                'message' => 'Solicita copia de sus datos',
            ])
            ->assertRedirect(route('business-advisors.privacy-requests.index'));

        $privacyRequest = BusinessAdvisorPrivacyRequest::query()->first();
        $this->assertNotNull($privacyRequest);
        $this->assertSame(PrivacyRequestStatus::Open, $privacyRequest->status);

        $this->actingAs($director)
            ->post(route('business-advisors.privacy-requests.resolve', $privacyRequest))
            ->assertRedirect();

        $this->assertSame(PrivacyRequestStatus::Resolved, $privacyRequest->fresh()->status);
    }

    public function test_phase_c_assignments_store_snapshot_without_legacy_person_columns(): void
    {
        $this->assertFalse(Schema::hasColumn('repository_business_advisors', 'first_name'));
        $this->assertFalse(Schema::hasColumn('repository_business_advisors', 'email'));

        $user = User::factory()->create();
        $user->assignRole('teacher');
        $repo = Repository::factory()->create();
        $repo->users()->attach($user->id);

        $assignment = app(AttachBusinessAdvisor::class)->handle($repo, $user, [
            'advisor' => [
                'first_name' => 'Lucia',
                'last_name' => 'Mora',
            ],
            'company' => [
                'name' => 'Empresa Fase C',
            ],
            'affiliation' => [
                'email' => 'lucia@empresafasec.test',
                'job_title' => 'Lider',
            ],
            'send_confirmation' => false,
        ]);

        $this->assertSame('Lucia', $assignment->snapshot['first_name']);
        $this->assertSame('lucia@empresafasec.test', $assignment->snapshot['email']);
        $this->assertSame('Lucia Mora', $assignment->fullName());
    }

    public function test_privacy_notice_page_is_public(): void
    {
        $this->get(route('privacy-notice.show'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('public/privacy-notice'));
    }
}
