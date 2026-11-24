<?php

use App\Http\Controllers\BusinessAdvisorAffiliationController;
use App\Http\Controllers\BusinessAdvisorConfirmationController;
use App\Http\Controllers\BusinessAdvisorController;
use App\Http\Controllers\BusinessAdvisorExportController;
use App\Http\Controllers\BusinessAdvisorPrivacyRequestController;
use App\Http\Controllers\CompanyCatalogController;
use App\Http\Controllers\RepositoryBusinessAdvisorController;
use Illuminate\Support\Facades\Route;

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
    Route::get('business-advisors/export', BusinessAdvisorExportController::class)
        ->name('business-advisors.export');
    Route::get('business-advisors/privacy-requests', [BusinessAdvisorPrivacyRequestController::class, 'index'])
        ->name('business-advisors.privacy-requests.index');
    Route::post('business-advisors/privacy-requests', [BusinessAdvisorPrivacyRequestController::class, 'store'])
        ->name('business-advisors.privacy-requests.store');
    Route::post('business-advisors/privacy-requests/{privacy_request}/resolve', [BusinessAdvisorPrivacyRequestController::class, 'resolve'])
        ->name('business-advisors.privacy-requests.resolve');
    Route::post('business-advisors/privacy-requests/{privacy_request}/reject', [BusinessAdvisorPrivacyRequestController::class, 'reject'])
        ->name('business-advisors.privacy-requests.reject');
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
