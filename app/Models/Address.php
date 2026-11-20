<?php

namespace App\Models;

use Database\Factories\AddressFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $street_line
 * @property string|null $street_line_2
 * @property string|null $neighborhood
 * @property string|null $city
 * @property string|null $state
 * @property string|null $postal_code
 * @property string $country
 * @property string|null $references
 */
#[Fillable([
    'street_line',
    'street_line_2',
    'neighborhood',
    'city',
    'state',
    'postal_code',
    'country',
    'references',
])]
class Address extends Model
{
    /** @use HasFactory<AddressFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'country' => 'MX',
    ];

    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    public function format(): string
    {
        return collect([
            $this->street_line,
            $this->street_line_2,
            $this->neighborhood,
            $this->city,
            $this->state,
            $this->postal_code,
            $this->country,
        ])->filter(fn (?string $part): bool => filled($part))->implode(', ');
    }
}
