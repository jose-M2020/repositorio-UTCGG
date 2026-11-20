<?php

namespace App\Models;

use Database\Factories\CompanyFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string|null $rfc
 * @property string|null $sector
 * @property string|null $phone
 * @property string|null $email
 * @property int|null $address_id
 * @property string|null $notes
 */
#[Fillable([
    'name',
    'rfc',
    'sector',
    'phone',
    'email',
    'address_id',
    'notes',
])]
class Company extends Model
{
    /** @use HasFactory<CompanyFactory> */
    use HasFactory;

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function repositories(): HasMany
    {
        return $this->hasMany(Repository::class);
    }

    public function businessAdvisors(): HasMany
    {
        return $this->hasMany(RepositoryBusinessAdvisor::class);
    }
}
