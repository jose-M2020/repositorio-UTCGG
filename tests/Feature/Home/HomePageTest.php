<?php

namespace Tests\Feature\Home;

use App\Models\Repository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDedicatedCatalogs();
    }

    public function test_home_page_renders_only_public_repositories(): void
    {
        Repository::factory()->create(['title' => 'Publico A', 'is_public' => true]);
        Repository::factory()->create(['title' => 'Publico B', 'is_public' => true]);
        Repository::factory()->private()->create(['title' => 'Privado']);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->has('latest', 2)
            ->has('featured', 2)
            ->where('latest', fn ($latest) => collect($latest)->pluck('title')->doesntContain('Privado'))
            ->where('featured', fn ($featured) => collect($featured)->pluck('title')->doesntContain('Privado')));
    }

    public function test_about_page_renders(): void
    {
        $response = $this->get(route('about'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('public/about'));
    }
}
