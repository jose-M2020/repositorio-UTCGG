<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RepositorioController;
use App\Http\Controllers\RepositorioUsuarioController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Models\Repositorio;
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
    
    Route::get('api/usuarios/{repositorio?}', [UsuarioController::class, 'search'])
            ->name('usuarios.get');
});

// || Roles
// -----------------------------------------

Route::group(['middleware' => 'auth'], function () {
    Route::resource('roles', RoleController::class);
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

Route::middleware('auth')->group(function () {
     Route::resource('repositorios', RepositorioController::class)
          ->only(['create', 'store']);

     Route::resource('repositorios', RepositorioController::class)
          ->middleware('authorizeMember')
          ->only(['edit', 'update', 'destroy']);     

     Route::prefix('mi-cuenta')->group(function () {
          Route::get('/repositories', [UsuarioController::class, 'showRepositories'])
               ->name('repositorios.user');

          Route::get('/repositorios/{repositorio}', [RepositorioController::class, 'showByUser'])
               ->middleware('authorizeMember')
               ->name('repositorios.user.show');
               
          Route::post('/repositorios/{repositorio}/members', [RepositorioUsuarioController::class, 'store'])
               ->middleware('authorizeMember')
               ->name('repositorios.member.store');
          
          Route::delete('/repositorios/{repositorio}/members/{usuario}', [RepositorioUsuarioController::class, 'destroy'])
               ->middleware('authorizeMember')
               ->name('repositorios.member.destroy');
      });
});

Route::resource('repositorios', RepositorioController::class)
         ->only(['index', 'show']);

// || Files
// -----------------------------------------

Route::group(['middleware' => 'auth'], function () {
    Route::resource('files', FileController::class)
         ->except(['store', 'create', 'destroy', 'update']);

    Route::get('mi-cuenta/repositorios/{repositorio}/archivos/upload', [FileController::class, 'create'])
         ->name('files.create');

    Route::post('mi-cuenta/repositorios/{repositorio}/archivos/upload', [FileController::class, 'store'])
         ->name('files.store');
     
    Route::put('mi-cuenta/repositorios/{repositorio}/archivos/{file}', [FileController::class, 'update'])
         ->name('files.update');

    Route::delete('mi-cuenta/repositorios/{repositorio}/archivos/{type?}/{file}', [FileController::class, 'destroy'])
         ->name('files.destroy');
    
    Route::get('files/download/{file}', [FileController::class, 'download'])
         ->name('files.download');
});

// Route::get('/archivos', [RepositorioController::class, 'downloadFile'])
//     ->middleware('auth')
//     ->name('files.download');


require __DIR__.'/auth.php';
