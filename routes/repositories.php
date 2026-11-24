<?php

use App\Http\Controllers\AccountSettingsController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\RepositoryAdvisorController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\RepositoryMemberController;
use Illuminate\Support\Facades\Route;

Route::post('repositories/{repository}/advisors', [RepositoryAdvisorController::class, 'assign'])
    ->name('repositories.advisors.assign');
Route::post('repositories/{repository}/advisors/reassign', [RepositoryAdvisorController::class, 'reassign'])
    ->name('repositories.advisors.reassign');
Route::delete('repositories/{repository}/advisors/{repository_advisor}', [RepositoryAdvisorController::class, 'release'])
    ->name('repositories.advisors.release');

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
        Route::get('/settings', [AccountSettingsController::class, 'edit'])
            ->name('account.settings');
        Route::patch('/settings/profile', [AccountSettingsController::class, 'updateProfile'])
            ->name('account.settings.profile');

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
