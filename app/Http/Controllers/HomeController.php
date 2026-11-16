<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\Repository;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $latest = Repository::query()
            ->where('is_public', true)
            ->latest()
            ->limit(8)
            ->with('career:id,code')
            ->get(['id', 'title', 'slug', 'description', 'career_id', 'created_at'])
            ->map(fn (Repository $repo) => [
                'id' => $repo->id,
                'title' => $repo->title,
                'slug' => $repo->slug,
                'description' => $repo->description,
                'career' => $repo->career?->code ?? '—',
                'created_at' => $repo->created_at?->toDateTimeString(),
            ])
            ->values()
            ->all();

        $featured = Repository::query()
            ->where('is_public', true)
            ->inRandomOrder()
            ->limit(8)
            ->with('career:id,code')
            ->get(['id', 'title', 'slug', 'description', 'career_id', 'created_at'])
            ->map(fn (Repository $repo) => [
                'id' => $repo->id,
                'title' => $repo->title,
                'slug' => $repo->slug,
                'description' => $repo->description,
                'career' => $repo->career?->code ?? '—',
                'created_at' => $repo->created_at?->toDateTimeString(),
            ])
            ->values()
            ->all();

        return Inertia::render('public/home', [
            'latest' => $latest,
            'featured' => $featured,
            'homeCareers' => Career::homeCards(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('public/about');
    }
}
