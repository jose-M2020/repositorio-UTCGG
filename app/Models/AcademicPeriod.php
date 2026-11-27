<?php

namespace App\Models;

use App\Enums\AcademicPeriodStatus;
use Database\Factories\AcademicPeriodFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property int $sequence
 * @property \Illuminate\Support\Carbon $starts_at
 * @property \Illuminate\Support\Carbon $ends_at
 * @property AcademicPeriodStatus $status
 */
#[Fillable([
    'code',
    'name',
    'sequence',
    'starts_at',
    'ends_at',
    'status',
])]
class AcademicPeriod extends Model
{
    /** @use HasFactory<AcademicPeriodFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'sequence' => 'integer',
            'starts_at' => 'date',
            'ends_at' => 'date',
            'status' => AcademicPeriodStatus::class,
        ];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sequence');
    }

    public function scopeCurrent(Builder $query): Builder
    {
        return $query->where('status', AcademicPeriodStatus::Current);
    }

    public function projectPeriods(): HasMany
    {
        return $this->hasMany(ProjectPeriod::class);
    }

    /**
     * Parse `{year}-{n}` into [year, n]. Returns null if invalid.
     *
     * @return array{0: int, 1: int}|null
     */
    public static function parseCode(string $code): ?array
    {
        if (! preg_match('/^(\d{4})-([1-3])$/', $code, $matches)) {
            return null;
        }

        return [(int) $matches[1], (int) $matches[2]];
    }

    public static function makeCode(int $year, int $n): string
    {
        return "{$year}-{$n}";
    }

    public static function defaultName(int $year, int $n): string
    {
        return match ($n) {
            1 => "Enero–Abril {$year}",
            2 => "Mayo–Agosto {$year}",
            3 => "Septiembre–Diciembre {$year}",
            default => "Periodo {$year}-{$n}",
        };
    }

    /**
     * @return array{starts_at: string, ends_at: string}
     */
    public static function defaultDateRange(int $year, int $n): array
    {
        return match ($n) {
            1 => ['starts_at' => "{$year}-01-01", 'ends_at' => "{$year}-04-30"],
            2 => ['starts_at' => "{$year}-05-01", 'ends_at' => "{$year}-08-31"],
            3 => ['starts_at' => "{$year}-09-01", 'ends_at' => "{$year}-12-18"],
            default => ['starts_at' => "{$year}-01-01", 'ends_at' => "{$year}-04-30"],
        };
    }

    /**
     * Advance `{year}-{n}` by one slot.
     *
     * @return array{0: int, 1: int}
     */
    public static function nextSlot(int $year, int $n): array
    {
        if ($n >= 3) {
            return [$year + 1, 1];
        }

        return [$year, $n + 1];
    }

    /**
     * Compare two codes chronologically. Negative if a < b.
     */
    public static function compareCodes(string $a, string $b): int
    {
        $parsedA = self::parseCode($a);
        $parsedB = self::parseCode($b);

        if ($parsedA === null || $parsedB === null) {
            return strcmp($a, $b);
        }

        [$yearA, $nA] = $parsedA;
        [$yearB, $nB] = $parsedB;

        return ($yearA * 3 + $nA) <=> ($yearB * 3 + $nB);
    }
}
