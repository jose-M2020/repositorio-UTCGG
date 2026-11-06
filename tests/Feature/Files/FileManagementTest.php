<?php

namespace Tests\Feature\Files;

use App\Models\File;
use App\Models\Repositorio;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
        Storage::fake('s3');
    }

    public function test_member_can_upload_files_to_repository(): void
    {
        $user = User::factory()->create(['carrera' => 'TI']);
        $user->assignRole('docente');

        $repo = Repositorio::factory()->create();
        $repo->users()->attach($user->id);

        $response = $this->actingAs($user)->post(
            route('files.store', $repo),
            [
                'archivos' => [
                    UploadedFile::fake()->create('documento.pdf', 100, 'application/pdf'),
                ],
            ],
        );

        $response->assertRedirect(route('repositorios.user.show', $repo));
        $this->assertDatabaseHas('files', [
            'repositorio_id' => $repo->id,
            'original_name' => 'documento.pdf',
        ]);

        $file = File::query()->where('repositorio_id', $repo->id)->first();
        $this->assertNotNull($file);
        Storage::disk('s3')->assertExists($file->file_path);
    }

    public function test_member_can_toggle_file_visibility(): void
    {
        $user = User::factory()->create();
        $user->assignRole('docente');

        $repo = Repositorio::factory()->create();
        $repo->users()->attach($user->id);

        $file = File::factory()->create([
            'repositorio_id' => $repo->id,
            'is_public' => false,
        ]);

        $this->actingAs($user)
            ->put(route('files.update', [$repo, $file]), [
                'is_public' => true,
            ])
            ->assertRedirect(route('repositorios.user.show', $repo));

        $this->assertTrue($file->fresh()?->is_public);
    }

    public function test_member_can_delete_file(): void
    {
        $user = User::factory()->create();
        $user->assignRole('docente');

        $repo = Repositorio::factory()->create();
        $repo->users()->attach($user->id);

        Storage::disk('s3')->put('files/test/demo.pdf', 'contenido');
        $file = File::factory()->create([
            'repositorio_id' => $repo->id,
            'file_path' => 'files/test/demo.pdf',
        ]);

        $this->actingAs($user)
            ->delete(route('files.destroy', [$repo, $file]))
            ->assertRedirect(route('repositorios.user.show', $repo));

        $this->assertDatabaseMissing('files', ['id' => $file->id]);
        Storage::disk('s3')->assertMissing('files/test/demo.pdf');
    }

    public function test_public_file_can_be_downloaded_by_guest(): void
    {
        Storage::disk('s3')->put('files/test/public.pdf', 'contenido-publico');

        $file = File::factory()->public()->create([
            'file_path' => 'files/test/public.pdf',
            'original_name' => 'public.pdf',
        ]);

        $this->get(route('files.download', $file))
            ->assertOk();
    }

    public function test_private_file_cannot_be_downloaded_by_guest(): void
    {
        Storage::disk('s3')->put('files/test/private.pdf', 'contenido-privado');

        $file = File::factory()->create([
            'file_path' => 'files/test/private.pdf',
            'is_public' => false,
        ]);

        $this->get(route('files.download', $file))
            ->assertForbidden();
    }

    public function test_non_member_cannot_upload_files(): void
    {
        $owner = User::factory()->create();
        $owner->assignRole('docente');

        $intruder = User::factory()->create();
        $intruder->assignRole('docente');

        $repo = Repositorio::factory()->create();
        $repo->users()->attach($owner->id);

        $this->actingAs($intruder)
            ->post(route('files.store', $repo), [
                'archivos' => [
                    UploadedFile::fake()->create('documento.pdf', 100, 'application/pdf'),
                ],
            ])
            ->assertForbidden();
    }
}
