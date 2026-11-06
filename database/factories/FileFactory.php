<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\Repositorio;
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
            'repositorio_id' => Repositorio::factory(),
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
