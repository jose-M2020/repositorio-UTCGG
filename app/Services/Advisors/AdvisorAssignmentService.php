<?php

namespace App\Services\Advisors;

use App\Enums\AdvisorRole;
use App\Enums\ProjectPeriodStatus;
use App\Models\AdvisorPeriodCapacity;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use App\Support\Permissions;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AdvisorAssignmentService
{
    public function __construct(
        private readonly AdvisorCapacityResolver $capacityResolver,
        private readonly EligibleAdvisorsQuery $eligibleAdvisorsQuery,
    ) {}

    public function assign(
        Repository $repository,
        User $advisor,
        User $actor,
        ?string $overrideReason = null,
    ): RepositoryAdvisor {
        $this->assertActorCanAssign($actor, $repository);

        return DB::transaction(function () use ($repository, $advisor, $actor, $overrideReason): RepositoryAdvisor {
            $repository = Repository::query()->lockForUpdate()->findOrFail($repository->id);
            $period = $repository->period;

            if ($period === null) {
                throw ValidationException::withMessages([
                    'advisor' => 'El repositorio no pertenece a un periodo de proyecto.',
                ]);
            }

            if ($period->status !== ProjectPeriodStatus::Open) {
                throw ValidationException::withMessages([
                    'advisor' => 'Solo se pueden asignar asesores en periodos abiertos.',
                ]);
            }

            $capacity = AdvisorPeriodCapacity::query()->firstOrCreate(
                [
                    'project_period_id' => $period->id,
                    'user_id' => $advisor->id,
                ],
                [
                    'max_projects' => null,
                    'is_available' => true,
                ],
            );

            $capacity = AdvisorPeriodCapacity::query()->lockForUpdate()->findOrFail($capacity->id);

            $activePrimary = RepositoryAdvisor::query()
                ->where('repository_id', $repository->id)
                ->where('role', AdvisorRole::Primary->value)
                ->whereNull('released_at')
                ->lockForUpdate()
                ->first();

            if ($activePrimary !== null) {
                throw ValidationException::withMessages([
                    'advisor' => 'El repositorio ya tiene un asesor principal activo. Usa reasignar.',
                ]);
            }

            $eligible = $this->eligibleAdvisorsQuery
                ->forRepository($repository, requireCapacity: false)
                ->first(fn (array $row): bool => (int) $row['user']->id === (int) $advisor->id);

            $load = $this->capacityResolver->currentLoad((int) $advisor->id, (int) $period->id);
            $capacityValue = $this->capacityResolver->effectiveCapacity($period, $capacity);
            $needsOverride = $eligible === null || $load >= $capacityValue;

            if ($needsOverride) {
                $this->assertOverrideAllowed($actor, $overrideReason, $advisor, $load, $capacityValue);
            }

            return RepositoryAdvisor::query()->create([
                'repository_id' => $repository->id,
                'user_id' => $advisor->id,
                'project_period_id' => $period->id,
                'role' => AdvisorRole::Primary->value,
                'assigned_by' => $actor->id,
                'assigned_at' => now(),
                'released_at' => null,
                'override_reason' => $needsOverride ? trim((string) $overrideReason) : null,
            ]);
        });
    }

    public function release(RepositoryAdvisor $assignment, User $actor): RepositoryAdvisor
    {
        $assignment->loadMissing('repository');
        $this->assertActorCanAssign($actor, $assignment->repository);

        if ($assignment->released_at !== null) {
            return $assignment;
        }

        $assignment->update([
            'released_at' => now(),
        ]);

        return $assignment->refresh();
    }

    public function reassign(
        Repository $repository,
        User $advisor,
        User $actor,
        ?string $overrideReason = null,
    ): RepositoryAdvisor {
        return DB::transaction(function () use ($repository, $advisor, $actor, $overrideReason): RepositoryAdvisor {
            $active = RepositoryAdvisor::query()
                ->where('repository_id', $repository->id)
                ->where('role', AdvisorRole::Primary->value)
                ->whereNull('released_at')
                ->lockForUpdate()
                ->first();

            if ($active !== null) {
                $this->release($active, $actor);
            }

            return $this->assign($repository, $advisor, $actor, $overrideReason);
        });
    }

    private function assertActorCanAssign(User $actor, Repository $repository): void
    {
        if (! $actor->can(Permissions::ADVISORS_ASSIGN)) {
            abort(403);
        }

        if ($actor->can(Permissions::USERS_CAREER_ANY)) {
            return;
        }

        $managed = $actor->managedCareerIds();
        if ($repository->career_id === null || ! $managed->contains((int) $repository->career_id)) {
            abort(403, 'No puedes asignar asesores fuera de tus carreras.');
        }
    }

    private function assertOverrideAllowed(
        User $actor,
        ?string $overrideReason,
        User $advisor,
        int $load,
        int $capacity,
    ): void {
        if (! $actor->can(Permissions::ADVISORS_OVERRIDE_CAPACITY) || blank($overrideReason)) {
            throw ValidationException::withMessages([
                'advisor' => sprintf(
                    '%s ya tiene %d/%d proyectos en este periodo.',
                    $advisor->fullName(),
                    $load,
                    $capacity,
                ),
            ]);
        }
    }
}
