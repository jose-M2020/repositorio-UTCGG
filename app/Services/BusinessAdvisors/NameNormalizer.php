<?php

namespace App\Services\BusinessAdvisors;

use Illuminate\Support\Str;

class NameNormalizer
{
    /**
     * @var list<string>
     */
    private const COMPANY_SUFFIXES = [
        'sa de cv',
        's a de c v',
        'sapi de cv',
        's de rl de cv',
        'sc',
        'ac',
        'sa',
        'cv',
    ];

    public static function normalize(?string $value): string
    {
        return Str::of($value ?? '')
            ->ascii()
            ->lower()
            ->replaceMatches('/[^a-z0-9\s]/', ' ')
            ->squish()
            ->toString();
    }

    public static function normalizePersonName(
        string $firstName,
        string $lastName,
        ?string $secondLastName = null,
    ): string {
        return self::normalize(collect([$firstName, $lastName, $secondLastName])
            ->filter(fn (?string $part): bool => filled($part))
            ->implode(' '));
    }

    public static function normalizeCompanyName(?string $value): string
    {
        $normalized = self::normalize($value);

        foreach (self::COMPANY_SUFFIXES as $suffix) {
            if (str_ends_with($normalized, ' '.$suffix)) {
                $normalized = Str::of($normalized)->beforeLast(' '.$suffix)->squish()->toString();
            }
        }

        return $normalized;
    }

    public static function normalizeEmail(?string $value): ?string
    {
        $email = trim(Str::lower((string) $value));

        return $email === '' ? null : $email;
    }

    public static function normalizePhone(?string $value): ?string
    {
        $digits = preg_replace('/\D+/', '', (string) $value) ?? '';

        return $digits === '' ? null : $digits;
    }

    public static function normalizeRfc(?string $value): ?string
    {
        $rfc = Str::upper(preg_replace('/\s+/', '', (string) $value) ?? '');

        return $rfc === '' ? null : $rfc;
    }

    public static function maskEmail(?string $email): ?string
    {
        $normalized = self::normalizeEmail($email);
        if ($normalized === null || ! str_contains($normalized, '@')) {
            return null;
        }

        [$local, $domain] = explode('@', $normalized, 2);
        $visible = Str::substr($local, 0, 1);

        return $visible.'***@'.$domain;
    }
}
