<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PrivacyNoticeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/acerca', [HomeController::class, 'about'])->name('about');
Route::get('/aviso-de-privacidad', PrivacyNoticeController::class)->name('privacy-notice.show');

require __DIR__.'/users.php';
require __DIR__.'/catalogs.php';
require __DIR__.'/project-periods.php';
require __DIR__.'/business-advisors.php';
require __DIR__.'/repositories.php';
require __DIR__.'/auth.php';
