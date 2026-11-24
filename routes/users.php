<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('users', UserController::class)
    ->except(['create', 'edit']);
Route::patch('users/{user}/role', [UserController::class, 'updateRole'])
    ->name('users.update-role');
Route::patch('users/{user}/active', [UserController::class, 'toggleActive'])
    ->name('users.toggle-active');
Route::patch('users/{user}/can-be-advisor', [UserController::class, 'toggleCanBeAdvisor'])
    ->name('users.toggle-can-be-advisor');
Route::post('users/{user}/password-link', [UserController::class, 'sendPasswordLink'])
    ->name('users.password-link');

Route::middleware('auth')->group(function (): void {
    Route::get('api/users/{repository?}', [UserController::class, 'search'])
        ->name('users.search');
});
