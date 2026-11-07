<?php

namespace App\Support;

use App\Models\Catalog as CatalogModel;

final class Catalog
{
    /**
     * @return array<string, string>
     */
    public static function careers(): array
    {
        return CatalogModel::query()
            ->active()
            ->ofType(CatalogModel::TYPE_CAREER)
            ->orderBy('sort_order')
            ->pluck('name', 'code')
            ->all();
    }

    /**
     * @return array<string, string>
     */
    public static function academicDegrees(): array
    {
        return CatalogModel::query()
            ->active()
            ->ofType(CatalogModel::TYPE_ACADEMIC_DEGREE)
            ->orderBy('sort_order')
            ->pluck('name', 'code')
            ->all();
    }

    /**
     * @return list<string>
     */
    public static function projectTypes(): array
    {
        return CatalogModel::query()
            ->active()
            ->ofType(CatalogModel::TYPE_PROJECT)
            ->orderBy('sort_order')
            ->pluck('code')
            ->values()
            ->all();
    }

    /**
     * @return list<array{code: string, name: string, image: string}>
     */
    public static function homeCareers(): array
    {
        return CatalogModel::query()
            ->active()
            ->ofType(CatalogModel::TYPE_CAREER)
            ->orderBy('sort_order')
            ->get(['code', 'name', 'meta'])
            ->map(function (CatalogModel $catalog): ?array {
                $meta = is_array($catalog->meta) ? $catalog->meta : [];
                $showOnHome = (bool) ($meta['show_on_home'] ?? false);
                $image = is_string($meta['image'] ?? null) ? $meta['image'] : null;

                if (! $showOnHome || ! $image) {
                    return null;
                }

                return [
                    'code' => $catalog->code,
                    'name' => $catalog->name,
                    'image' => $image,
                ];
            })
            ->filter()
            ->values()
            ->all();
    }
}
