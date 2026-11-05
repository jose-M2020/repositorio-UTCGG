<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::resource('usuarios', UserController::class)
    ->parameters(['usuarios' => 'user']);

require __DIR__.'/auth.php';
