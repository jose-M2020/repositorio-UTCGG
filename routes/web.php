<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\RepositoryMemberController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/acerca', [HomeController::class, 'about'])->name('about');

Route::resource('users', UserController::class)
    ->except(['create', 'edit']);
Route::patch('users/{user}/role', [UserController::class, 'updateRole'])
    ->name('users.update-role');
Route::patch('users/{user}/active', [UserController::class, 'toggleActive'])
    ->name('users.toggle-active');
Route::post('users/{user}/password-link', [UserController::class, 'sendPasswordLink'])
    ->name('users.password-link');

Route::middleware('auth')->group(function (): void {
    Route::get('api/users/{repository?}', [UserController::class, 'search'])
        ->name('users.search');
});

Route::resource('roles', RoleController::class);
Route::resource('catalogs', CatalogController::class)
    ->except(['create', 'edit', 'show']);
Route::patch('catalogs/{catalog}/active', [CatalogController::class, 'toggleActive'])
    ->name('catalogs.toggle-active');

Route::get('repositories', [RepositoryController::class, 'index'])
    ->name('repositories.index');

Route::get('files/download/{file}', [FileController::class, 'download'])
    ->name('files.download');

Route::middleware('auth')->group(function (): void {
    Route::resource('repositories', RepositoryController::class)
        ->only(['create', 'store']);

    Route::resource('repositories', RepositoryController::class)
        ->only(['edit', 'update', 'destroy']);

    Route::prefix('account')->group(function (): void {
        Route::get('/repositories', [RepositoryController::class, 'mine'])
            ->name('repositories.mine');

        Route::get('/repositories/{repository}', [RepositoryController::class, 'showByUser'])
            ->name('repositories.account.show');

        Route::post('/repositories/{repository}/members', [RepositoryMemberController::class, 'store'])
            ->name('repositories.members.store');

        Route::delete('/repositories/{repository}/members/{user}', [RepositoryMemberController::class, 'destroy'])
            ->name('repositories.members.destroy');

        Route::get('/repositories/{repository}/files/upload', [FileController::class, 'create'])
            ->name('files.create');

        Route::post('/repositories/{repository}/files/upload', [FileController::class, 'store'])
            ->name('files.store');

        Route::put('/repositories/{repository}/files/{file}', [FileController::class, 'update'])
            ->name('files.update');

        Route::delete('/repositories/{repository}/files/{file}', [FileController::class, 'destroy'])
            ->name('files.destroy');

        Route::delete('/repositories/{repository}/images/{index}', [FileController::class, 'destroyImage'])
            ->name('files.images.destroy');
    });
});

Route::get('repositories/{repository}', [RepositoryController::class, 'show'])
    ->name('repositories.show');

require __DIR__.'/auth.php';
