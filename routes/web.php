<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RepositorioController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;

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

Route::get('/', [HomeController::class, 'index'])
    // ->middleware(['optionalAuthentication:alumno,docente,admin'])
    ->name('home');

Route::get('acerca', function(){
    return view('about');
})/*->middleware(['optionalAuthentication:alumno,docente,admin'])*/->name('about');

// Route::get('/dashboard', function () {
//     return view('dashboard');
// });

// || Users
// -----------------------------------------

Route::group(['middleware' => 'auth'], function () {
    Route::resource('usuarios', UsuarioController::class);
});


// || Admin
// -----------------------------------------

// Route::group(['middleware' => 'auth'], function () {
//     Route::resources(['admin' => AdminController::class]);
// });

// || Teachers
// -----------------------------------------

// Route::group(['middleware' => 'auth'], function () {
//     Route::resources(['docentes' => DocenteController::class]);
// });

// || Students
// -----------------------------------------

// Route::middleware('auth')->group(function () {
//     Route::resource('alumnos', AlumnoController::class);
    
//     Route::get('alumnos/fetch_data', [AlumnoController::class, 'fetch_data'])
//         ->name('alumnos.fetch');
    
//     Route::get('alumnos/search', [AlumnoController::class, 'search'])
//         ->name('alumnos.search');
// });


// || Repositories
// -----------------------------------------

Route::group(['middleware' => 'auth'], function () {
    Route::resource('repositorios', RepositorioController::class)
         ->except(['index', 'show']);
});

Route::resource('repositorios', RepositorioController::class)
         ->only(['index', 'show']);

Route::get('repositorios/descargar/{repositorio}', [RepositorioController::class, 'downloadFile'])
    ->name('repositorios.download');

// || Files
// -----------------------------------------

Route::group(['middleware' => 'auth'], function () {
    Route::resource('files', FileController::class);
});

// Route::get('/archivos', [RepositorioController::class, 'downloadFile'])
//     ->middleware('auth')
//     ->name('files.download');


require __DIR__.'/auth.php';
