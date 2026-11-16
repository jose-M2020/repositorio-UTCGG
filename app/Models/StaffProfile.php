<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $employee_number
 * @property string $job_title
 * @property string|null $department
 * @property \Illuminate\Support\Carbon|null $hired_at
 * @property string|null $office
 */
#[Fillable([
    'user_id',
    'employee_number',
    'job_title',
    'department',
    'hired_at',
    'office',
])]
class StaffProfile extends Model
{
    /** @use HasFactory<\Database\Factories\StaffProfileFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'hired_at' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
