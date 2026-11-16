<?php

namespace App\Support;

use App\Models\Career;
use App\Models\EducationLevel;
use App\Models\ProjectType;

/**
 * Temporary facade over dedicated catalog tables.
 * Prefer Career / ProjectType / EducationLevel models directly in new code.
 */
final class Catalog
{
    /**
     * @return array<string, string>
     */
    public static function careers(): array
    {
        return Career::query()
            ->active()
            ->ordered()
            ->pluck('name', 'code')
            ->all();
    }

    /**
     * @return array<string, string>
     */
    public static function academicDegrees(): array
    {
        return EducationLevel::query()
            ->active()
            ->ordered()
            ->pluck('name', 'code')
            ->all();
    }

    /**
     * @return list<string>
     */
    public static function projectTypes(): array
    {
        return ProjectType::query()
            ->active()
            ->ordered()
            ->pluck('code')
            ->values()
            ->all();
    }

    /**
     * @return list<array{code: string, name: string, image: string}>
     */
    public static function homeCareers(): array
    {
        return Career::query()
            ->forHome()
            ->ordered()
            ->get(['code', 'name', 'image_path'])
            ->map(fn (Career $career): array => [
                'code' => $career->code,
                'name' => $career->name,
                'image' => (string) $career->image_path,
            ])
            ->values()
            ->all();
    }
}
