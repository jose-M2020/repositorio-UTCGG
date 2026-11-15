<?php

namespace Database\Factories;

use App\Enums\UserAccountStatus;
use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'second_last_name' => fake()->optional()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'user_type' => UserType::Staff,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'status' => UserAccountStatus::Active,
            'must_change_password' => false,
            'remember_token' => Str::random(10),
        ];
    }

    public function student(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => UserType::Student,
        ]);
    }

    public function teacher(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => UserType::Teacher,
        ]);
    }

    public function staff(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => UserType::Staff,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => UserAccountStatus::Inactive,
        ]);
    }

    public function pendingActivation(): static
    {
        return $this->state(fn (array $attributes) => [
            'password' => null,
            'status' => UserAccountStatus::PendingActivation,
        ]);
    }
}