<?php

namespace App\Models;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Enums\BusinessAdvisorConfirmedVia;
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
 * @property int|null $business_advisor_id
 * @property int|null $business_advisor_affiliation_id
 * @property array<string, mixed>|null $snapshot
 * @property int|null $company_id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $second_last_name
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $job_title
 * @property string|null $department
 * @property bool $is_primary
 * @property BusinessAdvisorAcceptanceStatus $acceptance_status
 * @property string|null $document_path
 * @property string|null $confirmation_token_hash
 * @property Carbon|null $confirmation_sent_at
 * @property Carbon|null $confirmation_expires_at
 * @property Carbon|null $confirmed_at
 * @property BusinessAdvisorConfirmedVia|null $confirmed_via
 * @property string|null $notes
 * @property int|null $created_by
 * @property Carbon $assigned_at
 * @property Carbon|null $released_at
 */
#[Fillable([
    'repository_id',
    'business_advisor_id',
    'business_advisor_affiliation_id',
    'snapshot',
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
    'confirmation_token_hash',
    'confirmation_sent_at',
    'confirmation_expires_at',
    'confirmed_at',
    'confirmed_via',
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
        'acceptance_status' => BusinessAdvisorAcceptanceStatus::Pending->value,
    ];

    protected function casts(): array
    {
        return [
            'snapshot' => 'array',
            'is_primary' => 'boolean',
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::class,
            'confirmed_via' => BusinessAdvisorConfirmedVia::class,
            'confirmation_sent_at' => 'datetime',
            'confirmation_expires_at' => 'datetime',
            'confirmed_at' => 'datetime',
            'assigned_at' => 'datetime',
            'released_at' => 'datetime',
        ];
    }

    /**
     * @return array{first_name?: string|null, last_name?: string|null, second_last_name?: string|null, company?: array<string, mixed>|null, job_title?: string|null, department?: string|null, email?: string|null, phone?: string|null, captured_at?: string|null}
     */
    public function displaySnapshot(): array
    {
        if (is_array($this->snapshot) && $this->snapshot !== []) {
            return $this->snapshot;
        }

        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'second_last_name' => $this->second_last_name,
            'company' => $this->company ? [
                'id' => $this->company->id,
                'name' => $this->company->name,
                'rfc' => $this->company->rfc,
            ] : null,
            'job_title' => $this->job_title,
            'department' => $this->department,
            'email' => $this->email,
            'phone' => $this->phone,
            'captured_at' => $this->assigned_at?->toIso8601String(),
        ];
    }

    public function fullName(): string
    {
        $snapshot = $this->displaySnapshot();

        return collect([
            $snapshot['first_name'] ?? null,
            $snapshot['last_name'] ?? null,
            $snapshot['second_last_name'] ?? null,
        ])->filter(fn (?string $part): bool => filled($part))->implode(' ');
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function businessAdvisor(): BelongsTo
    {
        return $this->belongsTo(BusinessAdvisor::class);
    }

    public function affiliation(): BelongsTo
    {
        return $this->belongsTo(BusinessAdvisorAffiliation::class, 'business_advisor_affiliation_id');
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
