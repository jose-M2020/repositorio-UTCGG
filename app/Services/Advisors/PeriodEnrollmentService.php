<?php

namespace App\Services\Advisors;

use App\Enums\ParticipantStatus;
use App\Enums\ProjectPeriodStatus;
use App\Enums\UserType;
use App\Models\ProjectPeriod;
use App\Models\ProjectPeriodParticipant;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PeriodEnrollmentService
{
    /**
     * @param  list<int>  $userIds
     * @return Collection<int, ProjectPeriodParticipant>
     */
    public function enrollMany(ProjectPeriod $period, array $userIds): Collection
    {
        if ($period->status === ProjectPeriodStatus::Closed) {
            throw ValidationException::withMessages([
                'participants' => 'No se pueden inscribir alumnos en un periodo cerrado.',
            ]);
        }

        $users = User::query()
            ->whereIn('id', $userIds)
            ->where('user_type', UserType::Academic->value)
            ->with('studentProfile')
            ->get()
            ->keyBy('id');

        return DB::transaction(function () use ($period, $userIds, $users): Collection {
            $created = collect();

            foreach ($userIds as $userId) {
                $user = $users->get($userId);
                if ($user === null) {
                    throw ValidationException::withMessages([
                        'participants' => "El usuario {$userId} no es un alumno valido.",
                    ]);
                }

                $careerId = $user->studentProfile?->career_id;
                if ($careerId === null) {
                    throw ValidationException::withMessages([
                        'participants' => sprintf('%s no tiene carrera en su perfil.', $user->fullName()),
                    ]);
                }

                $this->assertNotEnrolledInOtherOpenPeriod($period, $user);

                $participant = ProjectPeriodParticipant::query()->updateOrCreate(
                    [
                        'project_period_id' => $period->id,
                        'user_id' => $user->id,
                    ],
                    [
                        'career_id' => $careerId,
                        'status' => ParticipantStatus::Enrolled->value,
                    ],
                );

                $created->push($participant);
            }

            return $created;
        });
    }

    /**
     * Preview candidates for bulk enrollment.
     *
     * @param  array{career_id?: int|null, current_term?: int|null, generation?: string|null}  $filters
     * @return Collection<int, User>
     */
    public function preview(array $filters): Collection
    {
        return User::query()
            ->where('user_type', UserType::Academic->value)
            ->whereHas('studentProfile', function ($query) use ($filters): void {
                if (! empty($filters['career_id'])) {
                    $query->where('career_id', (int) $filters['career_id']);
                }
                if (! empty($filters['current_term'])) {
                    $query->where('current_term', (int) $filters['current_term']);
                }
                if (! empty($filters['generation'])) {
                    $query->where('generation', (string) $filters['generation']);
                }
            })
            ->with(['studentProfile.career'])
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get();
    }

    private function assertNotEnrolledInOtherOpenPeriod(ProjectPeriod $period, User $user): void
    {
        $exists = ProjectPeriodParticipant::query()
            ->where('user_id', $user->id)
            ->where('status', ParticipantStatus::Enrolled->value)
            ->where('project_period_id', '!=', $period->id)
            ->whereHas('period', function ($query) use ($period): void {
                $query
                    ->where('project_type_id', $period->project_type_id)
                    ->where('status', ProjectPeriodStatus::Open->value);
            })
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'participants' => sprintf(
                    '%s ya esta inscrito en otro periodo abierto del mismo tipo de proyecto.',
                    $user->fullName(),
                ),
            ]);
        }
    }
}
