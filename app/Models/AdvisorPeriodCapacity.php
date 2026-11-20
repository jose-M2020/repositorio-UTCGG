<?php

namespace App\Models;

use Database\Factories\AdvisorPeriodCapacityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $project_period_id
 * @property int $user_id
 * @property int|null $max_projects
 * @property bool $is_available
 * @property string|null $notes
 */
#[Fillable([
    'project_period_id',
    'user_id',
    'max_projects',
    'is_available',
    'notes',
])]
class AdvisorPeriodCapacity extends Model
{
    /** @use HasFactory<AdvisorPeriodCapacityFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'is_available' => true,
    ];

    protected function casts(): array
    {
        return [
            'max_projects' => 'integer',
            'is_available' => 'boolean',
        ];
    }

    public function period(): BelongsTo
    {
        return $this->belongsTo(ProjectPeriod::class, 'project_period_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
