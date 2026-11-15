<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * @var array<string, array{is_team_project: bool, requires_term: bool, requires_internship_flow: bool, requires_business_advisor: bool}>
     */
    private array $projectTypeFlags = [
        'integrative' => [
            'is_team_project' => true,
            'requires_term' => false,
            'requires_internship_flow' => false,
            'requires_business_advisor' => false,
        ],
        'internship' => [
            'is_team_project' => false,
            'requires_term' => false,
            'requires_internship_flow' => true,
            'requires_business_advisor' => true,
        ],
        'special_project' => [
            'is_team_project' => false,
            'requires_term' => false,
            'requires_internship_flow' => false,
            'requires_business_advisor' => false,
        ],
    ];

    public function up(): void
    {
        if (! Schema::hasTable('catalogs')) {
            return;
        }

        $now = now();
        $usedSlugs = [];

        $careers = DB::table('catalogs')->where('type', 'career')->orderBy('id')->get();
        foreach ($careers as $career) {
            $meta = $this->decodeMeta($career->meta);
            $slug = $this->uniqueSlug((string) $career->name, $usedSlugs);

            DB::table('careers')->insert([
                'id' => $career->id,
                'code' => $career->code,
                'name' => $career->name,
                'slug' => $slug,
                'description' => null,
                'image_path' => is_string($meta['image'] ?? null) ? $meta['image'] : null,
                'show_on_home' => (bool) ($meta['show_on_home'] ?? false),
                'sort_order' => (int) $career->sort_order,
                'is_active' => (bool) $career->is_active,
                'created_at' => $career->created_at ?? $now,
                'updated_at' => $career->updated_at ?? $now,
            ]);
        }

        $levels = DB::table('catalogs')->where('type', 'academic_degree')->orderBy('id')->get();
        foreach ($levels as $level) {
            DB::table('education_levels')->insert([
                'id' => $level->id,
                'code' => $level->code,
                'name' => $level->name,
                'sort_order' => (int) $level->sort_order,
                'is_active' => (bool) $level->is_active,
                'created_at' => $level->created_at ?? $now,
                'updated_at' => $level->updated_at ?? $now,
            ]);
        }

        $projectTypes = DB::table('catalogs')->where('type', 'project_type')->orderBy('id')->get();
        foreach ($projectTypes as $projectType) {
            $flags = $this->projectTypeFlags[$projectType->code] ?? [
                'is_team_project' => false,
                'requires_term' => false,
                'requires_internship_flow' => false,
                'requires_business_advisor' => false,
            ];

            DB::table('project_types')->insert([
                'id' => $projectType->id,
                'code' => $projectType->code,
                'name' => $projectType->name,
                'description' => null,
                'is_team_project' => $flags['is_team_project'],
                'requires_term' => $flags['requires_term'],
                'requires_internship_flow' => $flags['requires_internship_flow'],
                'requires_business_advisor' => $flags['requires_business_advisor'],
                'sort_order' => (int) $projectType->sort_order,
                'is_active' => (bool) $projectType->is_active,
                'created_at' => $projectType->created_at ?? $now,
                'updated_at' => $projectType->updated_at ?? $now,
            ]);
        }

        $this->resetSequence('careers');
        $this->resetSequence('education_levels');
        $this->resetSequence('project_types');
    }

    public function down(): void
    {
        DB::table('project_types')->delete();
        DB::table('education_levels')->delete();
        DB::table('careers')->delete();
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeMeta(mixed $meta): array
    {
        if (is_array($meta)) {
            return $meta;
        }

        if (! is_string($meta) || $meta === '') {
            return [];
        }

        $decoded = json_decode($meta, true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param  array<string, true>  $usedSlugs
     */
    private function uniqueSlug(string $name, array &$usedSlugs): string
    {
        $base = Str::slug($name) ?: 'career';
        $slug = $base;
        $suffix = 2;

        while (isset($usedSlugs[$slug])) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        $usedSlugs[$slug] = true;

        return $slug;
    }

    private function resetSequence(string $table): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('{$table}', 'id'), COALESCE((SELECT MAX(id) FROM {$table}), 1))");
        }
    }
};
