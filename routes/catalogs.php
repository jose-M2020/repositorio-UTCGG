<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\EducationLevelController;
use App\Http\Controllers\ProjectTypeController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::resource('roles', RoleController::class)
    ->except(['create', 'edit', 'show']);

Route::resource('careers', CareerController::class)
    ->except(['create', 'edit', 'show']);
Route::patch('careers/{career}/active', [CareerController::class, 'toggleActive'])
    ->name('careers.toggle-active');

Route::resource('project-types', ProjectTypeController::class)
    ->except(['create', 'edit', 'show'])
    ->names('project_types')
    ->parameters(['project-types' => 'project_type']);
Route::patch('project-types/{project_type}/active', [ProjectTypeController::class, 'toggleActive'])
    ->name('project_types.toggle-active');

Route::resource('education-levels', EducationLevelController::class)
    ->except(['create', 'edit', 'show'])
    ->names('education_levels')
    ->parameters(['education-levels' => 'education_level']);
Route::patch('education-levels/{education_level}/active', [EducationLevelController::class, 'toggleActive'])
    ->name('education_levels.toggle-active');
