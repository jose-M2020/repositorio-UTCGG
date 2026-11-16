<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;

trait HandlesCatalogResourceDestroy
{
    private const IN_USE_ERROR = 'está en uso; desactívalo en su lugar';

    protected function destroyResource(object $model, string $redirectRoute, string $successMessage): RedirectResponse
    {
        try {
            $model->delete();
        } catch (QueryException) {
            return redirect()
                ->route($redirectRoute)
                ->with('error', self::IN_USE_ERROR);
        }

        return redirect()
            ->route($redirectRoute)
            ->with('status', $successMessage);
    }
}