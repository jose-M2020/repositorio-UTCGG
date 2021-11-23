<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RepositorioController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->middleware(['auth:alumno,docente,admin'])->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth:alumno,docente,admin'])->name('dashboard');

// Docentes

Route::group(['middleware' => 'auth:admin'], function () {
    Route::resources(['docentes' => DocenteController::class]);
});

// Alumnos

Route::middleware(['auth:docente,admin'])->prefix('alumnos')->group(function () {
    Route::get('/', [AlumnoController::class, 'index'])
        ->name('alumnos');

    Route::get('/editar/{id}', [AlumnoController::class, 'edit'])
        ->name('alumnos.edit');
    Route::post('/editar/{id}', [AlumnoController::class, 'update'])
        ->name('alumnos.update');

    Route::get('/registrar', [AlumnoController::class, 'create'])
        ->name('alumnos.create');
    Route::post('/registrar', [AlumnoController::class, 'store'])
        ->name('alumnos.store');

    Route::post('/eliminar/{id}', [AlumnoController::class, 'destroy'])
        ->name('alumnos.destroy');
});


Route::middleware(['auth:alumno,docente,admin'])->prefix('alumnos')->group(function () {
    Route::get('/fetch_data', [AlumnoController::class, 'fetch_data'])
        ->name('alumnos.fetch');

    Route::get('/search', [AlumnoController::class, 'search'])
        ->name('alumnos.search');
});


// Repositorios

Route::middleware(['auth:alumno,docente,admin'])->prefix('repositorios')->group(function () {
    Route::get('/', [RepositorioController::class, 'index'])
        ->name('repositorios');

    Route::get('/registrar', [RepositorioController::class, 'create'])
        ->name('repositorios.create');
    Route::post('/registrar', [RepositorioController::class, 'store'])
        ->name('repositorios.store');

    Route::get('/{id}', [RepositorioController::class, 'show'])
        ->name('repositorios.show');

    Route::get('/descargar/{id}', [RepositorioController::class, 'downloadFile'])
        ->name('repositorios.download');
});

Route::middleware(['auth:docente,admin'])->prefix('repositorios')->group(function () {
    Route::get('/editar/{id}', [RepositorioController::class, 'edit'])
        ->name('repositorios.edit');
    Route::post('/editar/{id}', [RepositorioController::class, 'update'])
        ->name('repositorios.update');
});

Route::post('/repositorios/eliminar/{id}', [AlumnoController::class, 'destroy'])
    ->middleware('auth:admin')
    ->name('repositorios.destroy');

// Archivos

Route::get('/archivos', [RepositorioController::class, 'downloadFile'])
    ->name('files.download');

require __DIR__.'/auth.php';
