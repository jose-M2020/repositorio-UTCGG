<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserAccountStatus;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property int|null $career_catalog_id
 * @property UserAccountStatus $status
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['first_name', 'last_name', 'second_last_name', 'email', 'password', 'career_catalog_id', 'status'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Notifiable;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => UserAccountStatus::Active->value,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, mixed>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => UserAccountStatus::class,
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
        return $this->belongsToMany(Repositorio::class)->withTimestamps();
    }

    public function careerCatalog(): BelongsTo
    {
        return $this->belongsTo(Catalog::class, 'career_catalog_id');
    }
}
