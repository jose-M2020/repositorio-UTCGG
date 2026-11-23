<?php

namespace App\Models;

use App\Enums\PrivacyRequestStatus;
use App\Enums\PrivacyRequestType;
use Database\Factories\BusinessAdvisorPrivacyRequestFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $business_advisor_id
 * @property PrivacyRequestType $type
 * @property string|null $message
 * @property PrivacyRequestStatus $status
 * @property int|null $handled_by
 * @property Carbon|null $handled_at
 */
#[Fillable([
    'business_advisor_id',
    'type',
    'message',
    'status',
    'handled_by',
    'handled_at',
])]
class BusinessAdvisorPrivacyRequest extends Model
{
    /** @use HasFactory<BusinessAdvisorPrivacyRequestFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => PrivacyRequestStatus::Open->value,
    ];

    protected function casts(): array
    {
        return [
            'type' => PrivacyRequestType::class,
            'status' => PrivacyRequestStatus::class,
            'handled_at' => 'datetime',
        ];
    }

    public function businessAdvisor(): BelongsTo
    {
        return $this->belongsTo(BusinessAdvisor::class);
    }

    public function handledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
