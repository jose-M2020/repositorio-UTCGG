<?php

namespace App\Models;

use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use Database\Factories\BusinessAdvisorAffiliationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $business_advisor_id
 * @property int $company_id
 * @property string|null $job_title
 * @property string|null $department
 * @property string|null $email
 * @property string|null $phone
 * @property Carbon|null $starts_at
 * @property Carbon|null $ends_at
 * @property CatalogReviewStatus $status
 * @property CatalogSource $source
 * @property int|null $created_by
 * @property int|null $verified_by
 * @property Carbon|null $verified_at
 */
#[Fillable([
    'business_advisor_id',
    'company_id',
    'job_title',
    'department',
    'email',
    'phone',
    'starts_at',
    'ends_at',
    'status',
    'source',
    'created_by',
    'verified_by',
    'verified_at',
])]
class BusinessAdvisorAffiliation extends Model
{
    /** @use HasFactory<BusinessAdvisorAffiliationFactory> */
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
            'starts_at' => 'date',
            'ends_at' => 'date',
            'status' => CatalogReviewStatus::class,
            'source' => CatalogSource::class,
            'verified_at' => 'datetime',
        ];
    }

    public function businessAdvisor(): BelongsTo
    {
        return $this->belongsTo(BusinessAdvisor::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function repositoryAssignments(): HasMany
    {
        return $this->hasMany(RepositoryBusinessAdvisor::class, 'business_advisor_affiliation_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function scopeCurrent(Builder $query): Builder
    {
        return $query->whereNull('ends_at');
    }
}
