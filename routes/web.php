<?php

use App\Http\Controllers\AccountSettingsController;
use App\Http\Controllers\AdvisorCapacityController;
use App\Http\Controllers\BusinessAdvisorAffiliationController;
use App\Http\Controllers\BusinessAdvisorConfirmationController;
use App\Http\Controllers\BusinessAdvisorController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CompanyCatalogController;
use App\Http\Controllers\EducationLevelController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectPeriodController;
use App\Http\Controllers\ProjectPeriodParticipantController;
use App\Http\Controllers\ProjectTypeController;
use App\Http\Controllers\RepositoryAdvisorController;
use App\Http\Controllers\RepositoryBusinessAdvisorController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\RepositoryMemberController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/acerca', [HomeController::class, 'about'])->name('about');

Route::resource('users', UserController::class)
    ->except(['create', 'edit']);
Route::patch('users/{user}/role', [UserController::class, 'updateRole'])
    ->name('users.update-role');
Route::patch('users/{user}/active', [UserController::class, 'toggleActive'])
    ->name('users.toggle-active');
Route::post('users/{user}/password-link', [UserController::class, 'sendPasswordLink'])
    ->name('users.password-link');

Route::middleware('auth')->group(function (): void {
    Route::get('api/users/{repository?}', [UserController::class, 'search'])
        ->name('users.search');
});

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

Route::post('repositories/{repository}/advisors', [RepositoryAdvisorController::class, 'assign'])
    ->name('repositories.advisors.assign');
Route::post('repositories/{repository}/advisors/reassign', [RepositoryAdvisorController::class, 'reassign'])
    ->name('repositories.advisors.reassign');
Route::delete('repositories/{repository}/advisors/{repository_advisor}', [RepositoryAdvisorController::class, 'release'])
    ->name('repositories.advisors.release');

Route::get('business-advisors/confirm/{pivot}', BusinessAdvisorConfirmationController::class)
    ->name('business-advisors.confirm')
    ->middleware('signed');

Route::middleware('auth')->group(function (): void {
    Route::get('business-advisors/search', [BusinessAdvisorController::class, 'search'])
        ->middleware('throttle:30,1')
        ->name('business-advisors.search');
    Route::get('companies/search', [CompanyCatalogController::class, 'search'])
        ->middleware('throttle:30,1')
        ->name('companies.search');
    Route::post('business-advisors/duplicates', [BusinessAdvisorController::class, 'duplicates'])
        ->name('business-advisors.duplicates');
    Route::post('companies/duplicates', [CompanyCatalogController::class, 'duplicates'])
        ->name('companies.duplicates');

    Route::get('business-advisors/pending', [BusinessAdvisorController::class, 'pending'])
        ->name('business-advisors.pending');
    Route::post('business-advisors/{business_advisor}/verify', [BusinessAdvisorController::class, 'verify'])
        ->name('business-advisors.verify');
    Route::post('business-advisors/{business_advisor}/reject', [BusinessAdvisorController::class, 'reject'])
        ->name('business-advisors.reject');
    Route::post('business-advisors/{business_advisor}/merge', [BusinessAdvisorController::class, 'merge'])
        ->name('business-advisors.merge');
    Route::post('business-advisors/{business_advisor}/affiliations', [BusinessAdvisorController::class, 'storeAffiliation'])
        ->name('business-advisors.affiliations.store');

    Route::post('business-advisor-affiliations/{business_advisor_affiliation}/verify', [BusinessAdvisorAffiliationController::class, 'verify'])
        ->name('business-advisor-affiliations.verify');
    Route::post('business-advisor-affiliations/{business_advisor_affiliation}/reject', [BusinessAdvisorAffiliationController::class, 'reject'])
        ->name('business-advisor-affiliations.reject');

    Route::post('companies/{company}/verify', [CompanyCatalogController::class, 'verify'])
        ->name('companies.verify');
    Route::post('companies/{company}/reject', [CompanyCatalogController::class, 'reject'])
        ->name('companies.reject');
    Route::post('companies/{company}/merge', [CompanyCatalogController::class, 'merge'])
        ->name('companies.merge');

    Route::post('repositories/{repository}/business-advisors', [RepositoryBusinessAdvisorController::class, 'store'])
        ->name('repositories.business-advisors.store');
    Route::delete('repositories/{repository}/business-advisors/{assignment}', [RepositoryBusinessAdvisorController::class, 'destroy'])
        ->name('repositories.business-advisors.destroy');
    Route::post('repositories/{repository}/business-advisors/{assignment}/resend', [RepositoryBusinessAdvisorController::class, 'resend'])
        ->middleware('throttle:10,1')
        ->name('repositories.business-advisors.resend');
});

Route::get('repositories', [RepositoryController::class, 'index'])
    ->name('repositories.index');

Route::get('files/download/{file}', [FileController::class, 'download'])
    ->name('files.download');

Route::middleware('auth')->group(function (): void {
    Route::resource('repositories', RepositoryController::class)
        ->only(['create', 'store']);

    Route::resource('repositories', RepositoryController::class)
        ->only(['edit', 'update', 'destroy']);

    Route::prefix('account')->group(function (): void {
        Route::get('/settings', [AccountSettingsController::class, 'edit'])
            ->name('account.settings');
        Route::patch('/settings/profile', [AccountSettingsController::class, 'updateProfile'])
            ->name('account.settings.profile');

        Route::get('/repositories', [RepositoryController::class, 'mine'])
            ->name('repositories.mine');

        Route::get('/repositories/{repository}', [RepositoryController::class, 'showByUser'])
            ->name('repositories.account.show');

        Route::post('/repositories/{repository}/members', [RepositoryMemberController::class, 'store'])
            ->name('repositories.members.store');

        Route::delete('/repositories/{repository}/members/{user}', [RepositoryMemberController::class, 'destroy'])
            ->name('repositories.members.destroy');

        Route::get('/repositories/{repository}/files/upload', [FileController::class, 'create'])
            ->name('files.create');

        Route::post('/repositories/{repository}/files/upload', [FileController::class, 'store'])
            ->name('files.store');

        Route::put('/repositories/{repository}/files/{file}', [FileController::class, 'update'])
            ->name('files.update');

        Route::delete('/repositories/{repository}/files/{file}', [FileController::class, 'destroy'])
            ->name('files.destroy');

        Route::delete('/repositories/{repository}/images/{index}', [FileController::class, 'destroyImage'])
            ->name('files.images.destroy');
    });
});

Route::get('repositories/{repository}', [RepositoryController::class, 'show'])
    ->name('repositories.show');

require __DIR__.'/auth.php';
