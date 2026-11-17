<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesInUseResourceDestroy;
use App\Http\Requests\StoreCareerRequest;
use App\Http\Requests\UpdateCareerRequest;
use App\Models\Career;
use App\Support\Permissions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CareerController extends Controller implements HasMiddleware
{
    use HandlesInUseResourceDestroy;

    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::CAREERS_INDEX), only: ['index']),
            new Middleware(Permissions::ability(Permissions::CAREERS_CREATE), only: ['store']),
            new Middleware(Permissions::ability(Permissions::CAREERS_EDIT), only: ['update']),
            new Middleware(Permissions::ability(Permissions::CAREERS_TOGGLE_ACTIVE), only: ['toggleActive']),
            new Middleware(Permissions::ability(Permissions::CAREERS_DESTROY), only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $careers = Career::query()
            ->ordered()
            ->paginate(12)
            ->through(fn (Career $career): array => $this->serializeCareer($career));

        return Inertia::render('panel/careers/index', [
            'careers' => $careers,
        ]);
    }

    public function store(StoreCareerRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Career::query()->create([
            'code' => trim((string) $validated['code']),
            'name' => trim((string) $validated['name']),
            'slug' => $this->uniqueSlug(trim((string) $validated['name'])),
            'description' => isset($validated['description']) ? trim((string) $validated['description']) : null,
            'image_path' => isset($validated['image_path']) ? trim((string) $validated['image_path']) : null,
            'show_on_home' => (bool) ($validated['show_on_home'] ?? false),
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => true,
        ]);

        return redirect()
            ->route('careers.index')
            ->with('status', 'Carrera creada exitosamente.');
    }

    public function update(UpdateCareerRequest $request, Career $career): RedirectResponse
    {
        $validated = $request->validated();

        $career->update([
            'name' => trim((string) $validated['name']),
            'description' => isset($validated['description']) ? trim((string) $validated['description']) : null,
            'image_path' => isset($validated['image_path']) ? trim((string) $validated['image_path']) : null,
            'show_on_home' => (bool) ($validated['show_on_home'] ?? false),
            'sort_order' => (int) $validated['sort_order'],
        ]);

        return redirect()
            ->route('careers.index')
            ->with('status', 'Carrera actualizada exitosamente.');
    }

    public function toggleActive(Career $career): RedirectResponse
    {
        $career->update([
            'is_active' => ! $career->is_active,
        ]);

        $message = $career->is_active
            ? 'Carrera activada exitosamente.'
            : 'Carrera desactivada exitosamente.';

        return redirect()
            ->route('careers.index')
            ->with('status', $message);
    }

    public function destroy(Career $career): RedirectResponse
    {
        return $this->destroyResource($career, 'careers.index', 'Carrera eliminada exitosamente.');
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeCareer(Career $career): array
    {
        return [
            'id' => $career->id,
            'code' => $career->code,
            'name' => $career->name,
            'slug' => $career->slug,
            'description' => $career->description ?? '',
            'image_path' => $career->image_path ?? '',
            'show_on_home' => $career->show_on_home,
            'sort_order' => $career->sort_order,
            'is_active' => $career->is_active,
        ];
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'career';
        $slug = $base;
        $suffix = 2;

        while (Career::query()->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}