<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesInUseResourceDestroy;
use App\Http\Requests\StoreProjectTypeRequest;
use App\Http\Requests\UpdateProjectTypeRequest;
use App\Models\ProjectType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

class ProjectTypeController extends Controller implements HasMiddleware
{
    use HandlesInUseResourceDestroy;

    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:project_types.index', only: ['index']),
            new Middleware('can:project_types.create', only: ['store']),
            new Middleware('can:project_types.edit', only: ['update']),
            new Middleware('can:project_types.toggle-active', only: ['toggleActive']),
            new Middleware('can:project_types.destroy', only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $projectTypes = ProjectType::query()
            ->ordered()
            ->paginate(12)
            ->through(fn (ProjectType $projectType): array => $this->serializeProjectType($projectType));

        return Inertia::render('panel/project-types/index', [
            'projectTypes' => $projectTypes,
        ]);
    }

    public function store(StoreProjectTypeRequest $request): RedirectResponse
    {
        ProjectType::query()->create($this->storePayload($request));

        return redirect()
            ->route('project_types.index')
            ->with('status', 'Tipo de proyecto creado exitosamente.');
    }

    public function update(UpdateProjectTypeRequest $request, ProjectType $projectType): RedirectResponse
    {
        $projectType->update($this->updatePayload($request));

        return redirect()
            ->route('project_types.index')
            ->with('status', 'Tipo de proyecto actualizado exitosamente.');
    }

    public function toggleActive(ProjectType $projectType): RedirectResponse
    {
        $projectType->update([
            'is_active' => ! $projectType->is_active,
        ]);

        $message = $projectType->is_active
            ? 'Tipo de proyecto activado exitosamente.'
            : 'Tipo de proyecto desactivado exitosamente.';

        return redirect()
            ->route('project_types.index')
            ->with('status', $message);
    }

    public function destroy(ProjectType $projectType): RedirectResponse
    {
        return $this->destroyResource(
            $projectType,
            'project_types.index',
            'Tipo de proyecto eliminado exitosamente.',
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function storePayload(StoreProjectTypeRequest $request): array
    {
        $validated = $request->validated();

        return [
            'code' => trim((string) $validated['code']),
            'name' => trim((string) $validated['name']),
            'description' => isset($validated['description']) ? trim((string) $validated['description']) : null,
            'is_team_project' => (bool) ($validated['is_team_project'] ?? false),
            'requires_term' => (bool) ($validated['requires_term'] ?? false),
            'requires_internship_flow' => (bool) ($validated['requires_internship_flow'] ?? false),
            'requires_business_advisor' => (bool) ($validated['requires_business_advisor'] ?? false),
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => true,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function updatePayload(UpdateProjectTypeRequest $request): array
    {
        $validated = $request->validated();

        return [
            'name' => trim((string) $validated['name']),
            'description' => isset($validated['description']) ? trim((string) $validated['description']) : null,
            'is_team_project' => (bool) ($validated['is_team_project'] ?? false),
            'requires_term' => (bool) ($validated['requires_term'] ?? false),
            'requires_internship_flow' => (bool) ($validated['requires_internship_flow'] ?? false),
            'requires_business_advisor' => (bool) ($validated['requires_business_advisor'] ?? false),
            'sort_order' => (int) $validated['sort_order'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeProjectType(ProjectType $projectType): array
    {
        return [
            'id' => $projectType->id,
            'code' => $projectType->code,
            'name' => $projectType->name,
            'description' => $projectType->description ?? '',
            'is_team_project' => $projectType->is_team_project,
            'requires_term' => $projectType->requires_term,
            'requires_internship_flow' => $projectType->requires_internship_flow,
            'requires_business_advisor' => $projectType->requires_business_advisor,
            'sort_order' => $projectType->sort_order,
            'is_active' => $projectType->is_active,
        ];
    }
}