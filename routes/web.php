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

Route::resources(['docentes' => DocenteController::class]);

// Alumnos

Route::get('/alumnos', [AlumnoController::class, 'index'])->name('alumnos');
Route::get('/alumnos/fetch_data', [AlumnoController::class, 'fetch_data']);

Route::get('/alumnos/editar/{id}', [AlumnoController::class, 'edit'])->name('alumnos.edit');

Route::post('/alumnos/editar/{id}', [AlumnoController::class, 'update'])->name('alumnos.update');

Route::get('/alumnos/registrar', [AlumnoController::class, 'create'])->name('alumnos.register');

Route::post('/alumnos/registrar', [AlumnoController::class, 'store'])->name('alumnos.store');

Route::get('/alumnos/search', [AlumnoController::class, 'search']);

// Repositorios

Route::get('/repositorio/registrar', [RepositorioController::class, 'create'])->name('repositorio.register');
Route::post('/repositorio/registrar', [RepositorioController::class, 'store'])->name('repositorio.store');

require __DIR__.'/auth.php';
