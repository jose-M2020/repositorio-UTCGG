<?php

namespace App\Http\Controllers;

use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BusinessAdvisorExportController extends Controller
{
    public function __invoke(Request $request): StreamedResponse
    {
        $this->authorize('export', BusinessAdvisor::class);

        $filename = 'business-advisors-contacts-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function (): void {
            $handle = fopen('php://output', 'w');
            if ($handle === false) {
                return;
            }

            fputcsv($handle, [
                'advisor_id',
                'full_name',
                'status',
                'company',
                'job_title',
                'department',
                'email',
                'phone',
                'affiliation_status',
            ]);

            BusinessAdvisorAffiliation::query()
                ->with(['businessAdvisor', 'company:id,name'])
                ->whereHas('businessAdvisor')
                ->orderBy('business_advisor_id')
                ->chunk(200, function ($affiliations) use ($handle): void {
                    foreach ($affiliations as $affiliation) {
                        $advisor = $affiliation->businessAdvisor;
                        if ($advisor === null) {
                            continue;
                        }

                        fputcsv($handle, [
                            $advisor->id,
                            $advisor->fullName(),
                            $advisor->status?->value ?? $advisor->status,
                            $affiliation->company?->name,
                            $affiliation->job_title,
                            $affiliation->department,
                            $affiliation->email,
                            $affiliation->phone,
                            $affiliation->status?->value ?? $affiliation->status,
                        ]);
                    }
                });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}
