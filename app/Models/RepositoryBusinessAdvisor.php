<?php

namespace App\Models;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use Database\Factories\RepositoryBusinessAdvisorFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $repository_id
 * @property int|null $company_id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $job_title
 * @property string|null $department
 * @property bool $is_primary
 * @property BusinessAdvisorAcceptanceStatus $acceptance_status
 * @property string|null $document_path
 * @property string|null $notes
 * @property int|null $created_by
 * @property Carbon $assigned_at
 * @property Carbon|null $released_at
 */
#[Fillable([
    'repository_id',
    'company_id',
    'first_name',
    'last_name',
    'second_last_name',
    'email',
    'phone',
    'job_title',
    'department',
    'is_primary',
    'acceptance_status',
    'document_path',
    'notes',
    'created_by',
    'assigned_at',
    'released_at',
])]
class RepositoryBusinessAdvisor extends Model
{
    /** @use HasFactory<RepositoryBusinessAdvisorFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'is_primary' => true,
        'acceptance_status' => BusinessAdvisorAcceptanceStatus::Confirmed->value,
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::class,
            'assigned_at' => 'datetime',
            'released_at' => 'datetime',
        ];
    }

    public function fullName(): string
    {
        return collect([$this->first_name, $this->last_name, $this->second_last_name])
            ->filter(fn (?string $part): bool => filled($part))
            ->implode(' ');
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('released_at');
    }

    public function scopePrimary(Builder $query): Builder
    {
        return $query->where('is_primary', true);
    }
}
