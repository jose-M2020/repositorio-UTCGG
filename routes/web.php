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
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth:alumno,docente,admin'])->name('dashboard');

// Docentes

Route::group(['middleware' => 'auth:admin'], function () {
    Route::resources(['docentes' => DocenteController::class]);
});

// Alumnos

Route::get('/alumnos', [AlumnoController::class, 'index'])
    ->middleware('auth:docente,admin')
    ->name('alumnos');

Route::get('/alumnos/editar/{id}', [AlumnoController::class, 'edit'])
    ->middleware('auth:docente,admin')
    ->name('alumnos.edit');
Route::post('/alumnos/editar/{id}', [AlumnoController::class, 'update'])
    ->middleware('auth:docente,admin')
    ->name('alumnos.update');

Route::get('/alumnos/registrar', [AlumnoController::class, 'create'])
    ->middleware('auth:docente,admin')
    ->name('alumnos.register');
Route::post('/alumnos/registrar', [AlumnoController::class, 'store'])
    ->middleware('auth:docente,admin')
    ->name('alumnos.store');

Route::post('/alumnos/eliminar/{id}', [AlumnoController::class, 'destroy'])
    ->middleware('auth:docente,admin')
    ->name('alumnos.eliminar');

Route::get('/alumnos/fetch_data', [AlumnoController::class, 'fetch_data'])
    ->middleware('auth:alumno,docente,admin');

Route::get('/alumnos/search', [AlumnoController::class, 'search'])
    ->middleware('auth:alumno,docente,admin');

// Repositorios

Route::get('/repositorios', [RepositorioController::class, 'index'])
    ->middleware('auth:alumno,docente,admin')
    ->name('repositorios');

Route::get('/repositorios/registrar', [RepositorioController::class, 'create'])
    ->middleware('auth:alumno,docente,admin')
    ->name('repositorio.register');
Route::post('/repositorios/registrar', [RepositorioController::class, 'store'])
    ->middleware('auth:alumno,docente,admin')
    ->name('repositorios.store');

Route::get('/repositorios/editar/{id}', [RepositorioController::class, 'edit'])
    ->middleware('auth:docente,admin')
    ->name('repositorio.editar');
Route::post('/repositorios/editar/{id}', [RepositorioController::class, 'update'])
    ->middleware('auth:docente,admin')
    ->name('repositorios.editar');

Route::post('/repositorios/eliminar/{id}', [AlumnoController::class, 'destroy'])
    ->middleware('auth:admin')
    ->name('repositorios.eliminar');

Route::get('/repositorios/{id}', [RepositorioController::class, 'show'])
    ->middleware('auth:alumno,docente,admin')
    ->name('repositorios.show');

Route::get('/repositorios/descargar/{id}', [RepositorioController::class, 'downloadFile'])
    ->name('repositorios.store');

// Archivos

Route::get('/archivos', [RepositorioController::class, 'downloadFile'])
    ->name('repositorios.store');

require __DIR__.'/auth.php';
