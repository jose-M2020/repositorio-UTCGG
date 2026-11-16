<?php

namespace App\Models;

use App\Enums\CareerPosition;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property int $career_id
 * @property CareerPosition $position
 * @property Carbon $starts_at
 * @property Carbon|null $ends_at
 * @property int|null $created_by
 */
#[Fillable([
    'user_id',
    'career_id',
    'position',
    'starts_at',
    'ends_at',
    'created_by',
])]
class CareerAssignment extends Model
{
    /** @use HasFactory<\Database\Factories\CareerAssignmentFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'position' => CareerPosition::class,
            'starts_at' => 'date',
            'ends_at' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive(Builder $query, ?Carbon $on = null): Builder
    {
        $on ??= now();
        $date = $on->toDateString();

        return $query
            ->whereDate('starts_at', '<=', $date)
            ->where(function (Builder $builder) use ($date): void {
                $builder
                    ->whereNull('ends_at')
                    ->orWhereDate('ends_at', '>=', $date);
            });
    }
}
