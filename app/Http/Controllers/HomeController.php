<?php

namespace App\Http\Controllers;

use App\Models\Repositorio;
use App\Support\Catalog;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $latest = Repositorio::query()
            ->where('publico', true)
            ->latest()
            ->limit(8)
            ->with('careerCatalog:id,code')
            ->get(['id', 'nombre_rep', 'slug', 'descripcion', 'career_catalog_id', 'created_at'])
            ->map(fn (Repositorio $repo) => [
                'id' => $repo->id,
                'nombre_rep' => $repo->nombre_rep,
                'slug' => $repo->slug,
                'descripcion' => $repo->descripcion,
                'carrera' => $repo->careerCatalog?->code ?? '—',
                'created_at' => $repo->created_at?->toDateTimeString(),
            ])
            ->values()
            ->all();

        $featured = Repositorio::query()
            ->where('publico', true)
            ->inRandomOrder()
            ->limit(8)
            ->with('careerCatalog:id,code')
            ->get(['id', 'nombre_rep', 'slug', 'descripcion', 'career_catalog_id', 'created_at'])
            ->map(fn (Repositorio $repo) => [
                'id' => $repo->id,
                'nombre_rep' => $repo->nombre_rep,
                'slug' => $repo->slug,
                'descripcion' => $repo->descripcion,
                'carrera' => $repo->careerCatalog?->code ?? '—',
                'created_at' => $repo->created_at?->toDateTimeString(),
            ])
            ->values()
            ->all();

        return Inertia::render('home', [
            'latest' => $latest,
            'featured' => $featured,
            'homeCareers' => Catalog::homeCareers(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('about');
    }
}
