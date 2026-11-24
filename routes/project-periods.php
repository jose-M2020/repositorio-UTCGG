<?php

use App\Http\Controllers\AdvisorCapacityController;
use App\Http\Controllers\ProjectPeriodController;
use App\Http\Controllers\ProjectPeriodParticipantController;
use App\Http\Controllers\RepositoryAdvisorController;
use Illuminate\Support\Facades\Route;

Route::resource('project-periods', ProjectPeriodController::class)
    ->except(['create', 'edit'])
    ->names('project_periods')
    ->parameters(['project-periods' => 'project_period']);
Route::post('project-periods/{project_period}/open', [ProjectPeriodController::class, 'open'])
    ->name('project_periods.open');
Route::post('project-periods/{project_period}/close', [ProjectPeriodController::class, 'close'])
    ->name('project_periods.close');
Route::post('project-periods/{project_period}/participants/preview', [ProjectPeriodParticipantController::class, 'preview'])
    ->name('project_periods.participants.preview');
Route::post('project-periods/{project_period}/participants', [ProjectPeriodParticipantController::class, 'store'])
    ->name('project_periods.participants.store');
Route::put('project-periods/{project_period}/capacities', [AdvisorCapacityController::class, 'upsert'])
    ->name('project_periods.capacities.upsert');
Route::post('project-periods/{project_period}/distribute/propose', [ProjectPeriodController::class, 'proposeDistribution'])
    ->name('project_periods.distribute.propose');
Route::post('project-periods/{project_period}/distribute/apply', [RepositoryAdvisorController::class, 'applyDistribution'])
    ->name('project_periods.distribute.apply');
