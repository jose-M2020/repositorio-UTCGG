<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

final class Media
{
    public static function url(?string $path): string
    {
        if ($path === null || $path === '') {
            return asset('img/no-image.jpg');
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return Storage::disk('s3')->url($path);
    }
}
