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
            ->get(['id', 'nombre_rep', 'slug', 'descripcion', 'carrera', 'created_at']);

        $featured = Repositorio::query()
            ->where('publico', true)
            ->inRandomOrder()
            ->limit(8)
            ->get(['id', 'nombre_rep', 'slug', 'descripcion', 'carrera', 'created_at']);

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
