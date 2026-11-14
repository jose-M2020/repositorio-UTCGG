<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<File>
 */
class FileFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'repository_id' => Repository::factory(),
            'original_name' => fake()->word().'.pdf',
            'file_type' => 'pdf',
            'file_path' => 'files/test/'.fake()->uuid().'.pdf',
            'is_public' => false,
        ];
    }

    public function public(): static
    {
        return $this->state(fn (): array => ['is_public' => true]);
    }
}
