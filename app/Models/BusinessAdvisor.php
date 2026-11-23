<?php

namespace App\Models;

use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use Database\Factories\BusinessAdvisorFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string $name_normalized
 * @property CatalogReviewStatus $status
 * @property CatalogSource $source
 * @property int|null $merged_into_id
 * @property int|null $created_by
 * @property int|null $verified_by
 * @property Carbon|null $verified_at
 */
#[Fillable([
    'first_name',
    'last_name',
    'second_last_name',
    'name_normalized',
    'status',
    'source',
    'merged_into_id',
    'created_by',
    'verified_by',
    'verified_at',
])]
class BusinessAdvisor extends Model
{
    /** @use HasFactory<BusinessAdvisorFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => CatalogReviewStatus::PendingReview->value,
        'source' => CatalogSource::User->value,
    ];

    protected function casts(): array
    {
        return [
            'status' => CatalogReviewStatus::class,
            'source' => CatalogSource::class,
            'verified_at' => 'datetime',
        ];
    }

    public function fullName(): string
    {
        return collect([$this->first_name, $this->last_name, $this->second_last_name])
            ->filter(fn (?string $part): bool => filled($part))
            ->implode(' ');
    }

    public function affiliations(): HasMany
    {
        return $this->hasMany(BusinessAdvisorAffiliation::class);
    }

    public function repositoryAssignments(): HasMany
    {
        return $this->hasMany(RepositoryBusinessAdvisor::class);
    }

    public function mergedInto(): BelongsTo
    {
        return $this->belongsTo(self::class, 'merged_into_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function scopeSearchable(Builder $query, ?User $viewer = null): Builder
    {
        return $query->where(function (Builder $builder) use ($viewer): void {
            $builder->where('status', CatalogReviewStatus::Verified->value);

            if ($viewer !== null) {
                $builder->orWhere(function (Builder $ownPending) use ($viewer): void {
                    $ownPending
                        ->where('status', CatalogReviewStatus::PendingReview->value)
                        ->where('created_by', $viewer->id);
                });
            }
        })->whereNotIn('status', [
            CatalogReviewStatus::Merged->value,
            CatalogReviewStatus::Rejected->value,
            CatalogReviewStatus::Inactive->value,
        ]);
    }
}
