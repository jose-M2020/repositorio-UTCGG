<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::resource('usuarios', UserController::class)
    ->parameters(['usuarios' => 'user']);

Route::resource('roles', RoleController::class);

require __DIR__.'/auth.php';
