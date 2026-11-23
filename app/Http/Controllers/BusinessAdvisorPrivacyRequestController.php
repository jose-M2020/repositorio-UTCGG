<?php

namespace App\Http\Controllers;

use App\Enums\BusinessAdvisorAuditAction;
use App\Enums\PrivacyRequestStatus;
use App\Enums\PrivacyRequestType;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorPrivacyRequest;
use App\Services\BusinessAdvisors\BusinessAdvisorAuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BusinessAdvisorPrivacyRequestController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('privacyRequests', BusinessAdvisor::class);

        $status = $request->string('status')->toString();
        if (! in_array($status, ['open', 'resolved', 'rejected', ''], true)) {
            $status = 'open';
        }

        $requests = BusinessAdvisorPrivacyRequest::query()
            ->with([
                'businessAdvisor:id,first_name,last_name,second_last_name,status',
                'handledBy:id,first_name,last_name',
            ])
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('panel/business-advisors/privacy-requests', [
            'requests' => $requests,
            'filters' => [
                'status' => $status === '' ? 'all' : $status,
            ],
            'type_options' => collect(PrivacyRequestType::cases())
                ->map(fn (PrivacyRequestType $type): array => [
                    'value' => $type->value,
                    'label' => $type->label(),
                ])
                ->values()
                ->all(),
        ]);
    }

    public function store(
        Request $request,
        BusinessAdvisorAuditLogger $auditLogger,
    ): RedirectResponse {
        $this->authorize('privacyRequests', BusinessAdvisor::class);

        $validated = $request->validate([
            'business_advisor_id' => ['required', 'integer', 'exists:business_advisors,id'],
            'type' => ['required', Rule::enum(PrivacyRequestType::class)],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        $privacyRequest = BusinessAdvisorPrivacyRequest::query()->create([
            'business_advisor_id' => $validated['business_advisor_id'],
            'type' => $validated['type'],
            'message' => $validated['message'] ?? null,
            'status' => PrivacyRequestStatus::Open->value,
        ]);

        $auditLogger->log(
            BusinessAdvisorAuditAction::PrivacyRequest,
            $request->user(),
            (int) $validated['business_advisor_id'],
            null,
            [
                'privacy_request_id' => $privacyRequest->id,
                'type' => $validated['type'],
            ],
        );

        return redirect()
            ->route('business-advisors.privacy-requests.index')
            ->with('status', 'Solicitud ARCO registrada.');
    }

    public function resolve(
        Request $request,
        BusinessAdvisorPrivacyRequest $privacyRequest,
    ): RedirectResponse {
        $this->authorize('privacyRequests', BusinessAdvisor::class);

        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $privacyRequest->update([
            'status' => PrivacyRequestStatus::Resolved->value,
            'handled_by' => $request->user()?->id,
            'handled_at' => now(),
            'message' => filled($validated['notes'] ?? null)
                ? trim(($privacyRequest->message ? $privacyRequest->message."\n\n" : '').'Resolucion: '.$validated['notes'])
                : $privacyRequest->message,
        ]);

        return back()->with('status', 'Solicitud ARCO resuelta.');
    }

    public function reject(
        Request $request,
        BusinessAdvisorPrivacyRequest $privacyRequest,
    ): RedirectResponse {
        $this->authorize('privacyRequests', BusinessAdvisor::class);

        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $privacyRequest->update([
            'status' => PrivacyRequestStatus::Rejected->value,
            'handled_by' => $request->user()?->id,
            'handled_at' => now(),
            'message' => filled($validated['notes'] ?? null)
                ? trim(($privacyRequest->message ? $privacyRequest->message."\n\n" : '').'Rechazo: '.$validated['notes'])
                : $privacyRequest->message,
        ]);

        return back()->with('status', 'Solicitud ARCO rechazada.');
    }
}
