<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('rfc', 13)->nullable();
            $table->string('sector')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('name');
            $table->unique('rfc');
        });

        Schema::table('repositories', function (Blueprint $table) {
            $table->foreignId('company_id')
                ->nullable()
                ->after('project_period_id')
                ->constrained('companies')
                ->nullOnDelete();
        });

        Schema::create('repository_business_advisors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repository_id')->constrained('repositories')->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()->constrained('companies')->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('job_title')->nullable();
            $table->string('department')->nullable();
            $table->boolean('is_primary')->default(true);
            $table->string('acceptance_status', 32)->default('confirmed');
            $table->string('document_path')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('assigned_at');
            $table->timestamp('released_at')->nullable();
            $table->timestamps();

            $table->index(['repository_id', 'is_primary', 'released_at'], 'rba_repo_primary_released_idx');
            $table->index('company_id', 'rba_company_idx');
        });

        $this->backfillFromLegacyColumns();

        Schema::table('repositories', function (Blueprint $table) {
            $table->dropColumn(['company', 'external_advisor']);
        });
    }

    public function down(): void
    {
        Schema::table('repositories', function (Blueprint $table) {
            $table->string('company')->nullable()->after('project_period_id');
            $table->string('external_advisor')->nullable()->after('company');
        });

        $repositories = DB::table('repositories')->select(['id', 'company_id'])->get();
        foreach ($repositories as $repository) {
            $companyName = null;
            if ($repository->company_id !== null) {
                $companyName = DB::table('companies')->where('id', $repository->company_id)->value('name');
            }

            $advisor = DB::table('repository_business_advisors')
                ->where('repository_id', $repository->id)
                ->whereNull('released_at')
                ->orderByDesc('is_primary')
                ->orderByDesc('assigned_at')
                ->first();

            $advisorName = null;
            if ($advisor !== null) {
                $advisorName = collect([
                    $advisor->first_name,
                    $advisor->last_name,
                    $advisor->second_last_name,
                ])->filter(fn (?string $part): bool => filled($part))->implode(' ');
            }

            DB::table('repositories')->where('id', $repository->id)->update([
                'company' => $companyName,
                'external_advisor' => $advisorName !== '' ? $advisorName : null,
            ]);
        }

        Schema::dropIfExists('repository_business_advisors');

        Schema::table('repositories', function (Blueprint $table) {
            $table->dropConstrainedForeignId('company_id');
        });

        Schema::dropIfExists('companies');
    }

    private function backfillFromLegacyColumns(): void
    {
        if (! Schema::hasColumn('repositories', 'company') && ! Schema::hasColumn('repositories', 'external_advisor')) {
            return;
        }

        $rows = DB::table('repositories')->select(['id', 'company', 'external_advisor'])->orderBy('id')->get();

        foreach ($rows as $row) {
            $companyId = null;
            $companyName = is_string($row->company) ? trim($row->company) : '';

            if ($companyName !== '') {
                $companyId = DB::table('companies')->where('name', $companyName)->value('id');
                if ($companyId === null) {
                    $companyId = DB::table('companies')->insertGetId([
                        'name' => $companyName,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                DB::table('repositories')->where('id', $row->id)->update([
                    'company_id' => $companyId,
                ]);
            }

            $advisorName = is_string($row->external_advisor) ? trim($row->external_advisor) : '';
            if ($advisorName === '') {
                continue;
            }

            $parts = preg_split('/\s+/', $advisorName) ?: [];
            $firstName = $parts[0] ?? $advisorName;
            $lastName = $parts[1] ?? '—';
            $secondLastName = count($parts) > 2
                ? implode(' ', array_slice($parts, 2))
                : null;

            DB::table('repository_business_advisors')->insert([
                'repository_id' => $row->id,
                'company_id' => $companyId,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'second_last_name' => $secondLastName,
                'is_primary' => true,
                'acceptance_status' => 'confirmed',
                'assigned_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
};
