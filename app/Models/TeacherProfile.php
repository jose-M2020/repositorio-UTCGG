<?php

namespace App\Models;

use App\Enums\AcademicDegree;
use App\Enums\ContractType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $employee_number
 * @property int|null $primary_career_id
 * @property string|null $department
 * @property AcademicDegree|null $academic_degree
 * @property string|null $specialty
 * @property ContractType|null $contract_type
 * @property \Illuminate\Support\Carbon|null $hired_at
 * @property string|null $office
 * @property string|null $public_bio
 * @property array<int, string>|null $research_lines
 * @property string|null $orcid
 * @property bool $can_be_advisor
 */
#[Fillable([
    'user_id',
    'employee_number',
    'primary_career_id',
    'department',
    'academic_degree',
    'specialty',
    'contract_type',
    'hired_at',
    'office',
    'public_bio',
    'research_lines',
    'orcid',
    'can_be_advisor',
])]
class TeacherProfile extends Model
{
    /** @use HasFactory<\Database\Factories\TeacherProfileFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'can_be_advisor' => true,
    ];

    protected function casts(): array
    {
        return [
            'academic_degree' => AcademicDegree::class,
            'contract_type' => ContractType::class,
            'hired_at' => 'date',
            'research_lines' => 'array',
            'can_be_advisor' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function primaryCareer(): BelongsTo
    {
        return $this->belongsTo(Career::class, 'primary_career_id');
    }
}
