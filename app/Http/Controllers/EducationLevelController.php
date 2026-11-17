<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesInUseResourceDestroy;
use App\Http\Requests\StoreEducationLevelRequest;
use App\Http\Requests\UpdateEducationLevelRequest;
use App\Models\EducationLevel;
use App\Support\Permissions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

class EducationLevelController extends Controller implements HasMiddleware
{
    use HandlesInUseResourceDestroy;

    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::EDUCATION_LEVELS_INDEX), only: ['index']),
            new Middleware(Permissions::ability(Permissions::EDUCATION_LEVELS_CREATE), only: ['store']),
            new Middleware(Permissions::ability(Permissions::EDUCATION_LEVELS_EDIT), only: ['update']),
            new Middleware(Permissions::ability(Permissions::EDUCATION_LEVELS_TOGGLE_ACTIVE), only: ['toggleActive']),
            new Middleware(Permissions::ability(Permissions::EDUCATION_LEVELS_DESTROY), only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $educationLevels = EducationLevel::query()
            ->ordered()
            ->paginate(12)
            ->through(fn (EducationLevel $educationLevel): array => $this->serializeEducationLevel($educationLevel));

        return Inertia::render('panel/education-levels/index', [
            'educationLevels' => $educationLevels,
        ]);
    }

    public function store(StoreEducationLevelRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        EducationLevel::query()->create([
            'code' => trim((string) $validated['code']),
            'name' => trim((string) $validated['name']),
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => true,
        ]);

        return redirect()
            ->route('education_levels.index')
            ->with('status', 'Nivel educativo creado exitosamente.');
    }

    public function update(UpdateEducationLevelRequest $request, EducationLevel $educationLevel): RedirectResponse
    {
        $validated = $request->validated();

        $educationLevel->update([
            'name' => trim((string) $validated['name']),
            'sort_order' => (int) $validated['sort_order'],
        ]);

        return redirect()
            ->route('education_levels.index')
            ->with('status', 'Nivel educativo actualizado exitosamente.');
    }

    public function toggleActive(EducationLevel $educationLevel): RedirectResponse
    {
        $educationLevel->update([
            'is_active' => ! $educationLevel->is_active,
        ]);

        $message = $educationLevel->is_active
            ? 'Nivel educativo activado exitosamente.'
            : 'Nivel educativo desactivado exitosamente.';

        return redirect()
            ->route('education_levels.index')
            ->with('status', $message);
    }

    public function destroy(EducationLevel $educationLevel): RedirectResponse
    {
        return $this->destroyResource(
            $educationLevel,
            'education_levels.index',
            'Nivel educativo eliminado exitosamente.',
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeEducationLevel(EducationLevel $educationLevel): array
    {
        return [
            'id' => $educationLevel->id,
            'code' => $educationLevel->code,
            'name' => $educationLevel->name,
            'sort_order' => $educationLevel->sort_order,
            'is_active' => $educationLevel->is_active,
        ];
    }
}