<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RepositorioController;
use App\Http\Controllers\RepositorioUsuarioController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/acerca', [HomeController::class, 'about'])->name('about');

Route::resource('usuarios', UserController::class)
    ->parameters(['usuarios' => 'user']);

Route::middleware('auth')->group(function (): void {
    Route::get('api/usuarios/{repositorio?}', [UserController::class, 'search'])
        ->name('usuarios.get');
});

Route::resource('roles', RoleController::class);

Route::get('repositorios', [RepositorioController::class, 'index'])
    ->name('repositorios.index');

Route::get('files/download/{file}', [FileController::class, 'download'])
    ->name('files.download');

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

        Route::get('/repositorios/{repositorio}/archivos/upload', [FileController::class, 'create'])
            ->name('files.create');

        Route::post('/repositorios/{repositorio}/archivos/upload', [FileController::class, 'store'])
            ->name('files.store');

        Route::put('/repositorios/{repositorio}/archivos/{file}', [FileController::class, 'update'])
            ->name('files.update');

        Route::delete('/repositorios/{repositorio}/archivos/{file}', [FileController::class, 'destroy'])
            ->name('files.destroy');

        Route::delete('/repositorios/{repositorio}/imagenes/{index}', [FileController::class, 'destroyImage'])
            ->name('files.images.destroy');
    });
});

Route::get('repositorios/{repositorio}', [RepositorioController::class, 'show'])
    ->name('repositorios.show');

require __DIR__.'/auth.php';
