<?php

use App\Http\Controllers\RepositorioController;
use App\Http\Controllers\RepositorioUsuarioController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::resource('usuarios', UserController::class)
    ->parameters(['usuarios' => 'user']);

Route::resource('roles', RoleController::class);

Route::resource('repositorios', RepositorioController::class)
    ->only(['index', 'show']);

Route::middleware('auth')->group(function (): void {
    Route::resource('repositorios', RepositorioController::class)
        ->only(['create', 'store']);

    Route::resource('repositorios', RepositorioController::class)
        ->only(['edit', 'update', 'destroy']);

    Route::prefix('mi-cuenta')->group(function (): void {
        Route::get('/repositories', [RepositorioController::class, 'mine'])
            ->name('repositorios.user');

        Route::get('/repositorios/{repositorio}', [RepositorioController::class, 'showByUser'])
            ->name('repositorios.user.show');

        Route::post('/repositorios/{repositorio}/members', [RepositorioUsuarioController::class, 'store'])
            ->name('repositorios.member.store');

        Route::delete('/repositorios/{repositorio}/members/{user}', [RepositorioUsuarioController::class, 'destroy'])
            ->name('repositorios.member.destroy');
    });
});

require __DIR__.'/auth.php';
