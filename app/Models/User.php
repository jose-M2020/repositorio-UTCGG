<?php

namespace App\Models;

use App\Enums\CareerPosition;
use App\Enums\UserAccountStatus;
use App\Enums\UserType;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string $email
 * @property UserType|null $user_type
 * @property string|null $phone
 * @property string|null $avatar_path
 * @property Carbon|null $last_login_at
 * @property bool $must_change_password
 * @property array<string, mixed>|null $preferences
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property UserAccountStatus $status
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable([
    'first_name',
    'last_name',
    'second_last_name',
    'email',
    'user_type',
    'phone',
    'avatar_path',
    'last_login_at',
    'must_change_password',
    'preferences',
    'password',
    'status',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Notifiable, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => UserAccountStatus::Active->value,
        'must_change_password' => false,
    ];

    /**
     * @return array<string, mixed>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => UserAccountStatus::class,
            'user_type' => UserType::class,
            'last_login_at' => 'datetime',
            'must_change_password' => 'boolean',
            'preferences' => 'array',
        ];
    }

    public function fullName(): string
    {
        return collect([$this->first_name, $this->last_name, $this->second_last_name])
            ->filter(fn (?string $part): bool => filled($part))
            ->implode(' ');
    }

    public function repositories(): BelongsToMany
    {
        return $this->belongsToMany(Repository::class, 'repository_user')->withTimestamps();
    }

    public function studentProfile(): HasOne
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function teacherProfile(): HasOne
    {
        return $this->hasOne(TeacherProfile::class);
    }

    public function staffProfile(): HasOne
    {
        return $this->hasOne(StaffProfile::class);
    }

    public function careerAssignments(): HasMany
    {
        return $this->hasMany(CareerAssignment::class);
    }

    public function activeCareerAssignments(): HasMany
    {
        return $this->careerAssignments()->active();
    }

    public function profile(): StudentProfile|TeacherProfile|StaffProfile|null
    {
        return match ($this->user_type) {
            UserType::Student => $this->studentProfile,
            UserType::Teacher => $this->teacherProfile,
            UserType::Staff => $this->staffProfile,
            default => null,
        };
    }

    /**
     * Career IDs where the user has an active career_director assignment.
     *
     * @return Collection<int, int>
     */
    public function managedCareerIds(): Collection
    {
        return $this->activeCareerAssignments()
            ->where('position', CareerPosition::CareerDirector->value)
            ->pluck('career_id')
            ->map(fn ($id): int => (int) $id)
            ->unique()
            ->values();
    }

    /**
     * All career IDs the user is currently linked to (student career + active assignments).
     *
     * @return Collection<int, int>
     */
    public function primaryCareer(): ?Career
    {
        $this->loadMissing(['studentProfile.career', 'activeCareerAssignments.career']);

        if ($this->user_type === UserType::Student) {
            return $this->studentProfile?->career;
        }

        return $this->activeCareerAssignments->first()?->career;
    }

    public function careerCode(): ?string
    {
        return $this->primaryCareer()?->code;
    }

    public function careerName(): ?string
    {
        return $this->primaryCareer()?->name;
    }

    public function careerIds(): Collection
    {
        $ids = $this->activeCareerAssignments()
            ->pluck('career_id')
            ->map(fn ($id): int => (int) $id);

        if ($this->user_type === UserType::Student) {
            $careerId = $this->studentProfile?->career_id;
            if ($careerId !== null) {
                $ids->push((int) $careerId);
            }
        }

        return $ids->unique()->values();
    }

    /**
     * Users linked to any of the given careers via student profile or active assignment.
     *
     * @param  list<int>  $careerIds
     */
    /**
     * @param  list<string>  $codes
     */
    public function scopeWhereCareerCodes(Builder $query, array $codes): Builder
    {
        if ($codes === []) {
            return $query;
        }

        return $query->where(function (Builder $builder) use ($codes): void {
            $builder
                ->whereHas('studentProfile.career', fn (Builder $career): Builder => $career->whereIn('code', $codes))
                ->orWhereHas('careerAssignments', function (Builder $assignments) use ($codes): void {
                    $assignments->active()->whereHas(
                        'career',
                        fn (Builder $career): Builder => $career->whereIn('code', $codes),
                    );
                });
        });
    }

    public function scopeInCareers(Builder $query, array $careerIds): Builder
    {
        if ($careerIds === []) {
            return $query->whereRaw('0 = 1');
        }

        return $query->where(function (Builder $builder) use ($careerIds): void {
            $builder
                ->whereHas('studentProfile', fn (Builder $profile): Builder => $profile->whereIn('career_id', $careerIds))
                ->orWhereHas('careerAssignments', function (Builder $assignments) use ($careerIds): void {
                    $assignments->active()->whereIn('career_id', $careerIds);
                });
        });
    }
}
