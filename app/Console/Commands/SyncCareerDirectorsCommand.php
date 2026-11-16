<?php

namespace App\Console\Commands;

use App\Enums\CareerPosition;
use App\Models\User;
use App\Services\Users\UserProvisioningService;
use App\Support\UserRoles;
use Illuminate\Console\Command;

class SyncCareerDirectorsCommand extends Command
{
    protected $signature = 'roles:sync-career-directors';

    protected $description = 'Grant or revoke the career_director role based on active career assignments';

    public function handle(UserProvisioningService $provisioning): int
    {
        $users = User::query()
            ->where(function ($query): void {
                $query
                    ->role(UserRoles::CAREER_DIRECTOR)
                    ->orWhereHas('careerAssignments', function ($assignments): void {
                        $assignments
                            ->active()
                            ->where('position', CareerPosition::CareerDirector->value);
                    });
            })
            ->get();

        $synced = 0;

        foreach ($users as $user) {
            $provisioning->syncCareerDirectorRole($user);
            $synced++;
        }

        $this->info("Synced career director role for {$synced} users.");

        return self::SUCCESS;
    }
}
