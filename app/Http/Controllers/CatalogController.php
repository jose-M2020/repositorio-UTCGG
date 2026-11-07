<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCatalogRequest;
use App\Http\Requests\UpdateCatalogRequest;
use App\Models\Catalog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:catalogos.index', only: ['index', 'show']),
            new Middleware('can:catalogos.create', only: ['create', 'store']),
            new Middleware('can:catalogos.edit', only: ['edit', 'update']),
            new Middleware('can:catalogos.destroy', only: ['destroy']),
        ];
    }

    public function index(Request $request): Response
    {
        $type = $request->string('type')->toString();

        $catalogs = Catalog::query()
            ->when($type !== '' && $type !== 'all', fn ($query) => $query->where('type', $type))
            ->orderBy('type')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Catalog $catalog): array => $this->serializeCatalog($catalog));

        return Inertia::render('catalogs/index', [
            'catalogs' => $catalogs,
            'filters' => [
                'type' => $type ?: 'all',
            ],
            'catalogTypes' => $this->catalogTypes(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('catalogs/create', [
            'catalogTypes' => $this->catalogTypes(),
        ]);
    }

    public function store(StoreCatalogRequest $request): RedirectResponse
    {
        Catalog::query()->create($this->validatedPayload($request));

        return redirect()
            ->route('catalogos.index')
            ->with('status', 'Catalogo creado exitosamente.');
    }

    public function show(Catalog $catalog): Response
    {
        return Inertia::render('catalogs/show', [
            'catalog' => $this->serializeCatalog($catalog),
            'catalogTypes' => $this->catalogTypes(),
        ]);
    }

    public function edit(Catalog $catalog): Response
    {
        return Inertia::render('catalogs/edit', [
            'catalog' => $this->serializeCatalog($catalog),
            'catalogTypes' => $this->catalogTypes(),
        ]);
    }

    public function update(UpdateCatalogRequest $request, Catalog $catalog): RedirectResponse
    {
        $catalog->update($this->validatedPayload($request));

        return redirect()
            ->route('catalogos.index')
            ->with('status', 'Catalogo actualizado exitosamente.');
    }

    public function destroy(Catalog $catalog): RedirectResponse
    {
        $catalog->delete();

        return redirect()
            ->route('catalogos.index')
            ->with('status', 'Catalogo eliminado exitosamente.');
    }

    /**
     * @return array<string, string>
     */
    private function catalogTypes(): array
    {
        return [
            Catalog::TYPE_CAREER => 'Area de estudio',
            Catalog::TYPE_PROJECT => 'Tipo de proyecto',
            Catalog::TYPE_ACADEMIC_DEGREE => 'Grado academico',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeCatalog(Catalog $catalog): array
    {
        $meta = is_array($catalog->meta) ? $catalog->meta : [];

        return [
            'id' => $catalog->id,
            'type' => $catalog->type,
            'code' => $catalog->code,
            'name' => $catalog->name,
            'sort_order' => $catalog->sort_order,
            'is_active' => $catalog->is_active,
            'meta' => [
                'image' => is_string($meta['image'] ?? null) ? $meta['image'] : '',
                'show_on_home' => (bool) ($meta['show_on_home'] ?? false),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedPayload(StoreCatalogRequest|UpdateCatalogRequest $request): array
    {
        $validated = $request->validated();
        $type = (string) $validated['type'];
        $meta = null;

        if ($type === Catalog::TYPE_CAREER) {
            $meta = [
                'image' => trim((string) ($validated['meta_image'] ?? '')),
                'show_on_home' => (bool) ($validated['meta_show_on_home'] ?? false),
            ];
        }

        return [
            'type' => $type,
            'code' => trim((string) $validated['code']),
            'name' => trim((string) $validated['name']),
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => (bool) $validated['is_active'],
            'meta' => $meta,
        ];
    }
}
