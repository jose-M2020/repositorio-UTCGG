<?php

namespace Tests\Feature\Home;

use App\Models\Repositorio;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders_only_public_repositories(): void
    {
        Repositorio::factory()->create(['nombre_rep' => 'Publico A', 'publico' => true]);
        Repositorio::factory()->create(['nombre_rep' => 'Publico B', 'publico' => true]);
        Repositorio::factory()->private()->create(['nombre_rep' => 'Privado']);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->has('latest', 2)
            ->has('featured', 2)
            ->where('latest', fn ($latest) => collect($latest)->pluck('nombre_rep')->doesntContain('Privado'))
            ->where('featured', fn ($featured) => collect($featured)->pluck('nombre_rep')->doesntContain('Privado')));
    }

    public function test_about_page_renders(): void
    {
        $response = $this->get(route('about'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('about'));
    }
}
