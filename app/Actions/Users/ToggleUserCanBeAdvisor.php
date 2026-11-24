<?php

namespace App\Actions\Users;

use App\Enums\UserType;
use App\Models\TeacherProfile;
use App\Models\User;
use Illuminate\Validation\ValidationException;

final class ToggleUserCanBeAdvisor
{
    public function __construct(
        private EnsureCanManageUser $ensureCanManageUser,
    ) {}

    /**
     * @return array{user: User, message: string}
     */
    public function handle(User $actor, User $user): array
    {
        $this->ensureCanManageUser->handle($actor, $user);

        if ($user->user_type !== UserType::Workforce) {
            throw ValidationException::withMessages([
                'user' => 'Solo a docentes se les puede permitir asesorar proyectos.',
            ]);
        }

        $profile = TeacherProfile::query()->firstOrCreate(
            ['user_id' => $user->id],
            ['can_be_advisor' => true],
        );

        $nextValue = !$profile->can_be_advisor;

        $profile->update([
            'can_be_advisor' => $nextValue,
        ]);

        return [
            'user' => $user->refresh()->load('teacherProfile'),
            'message' => $nextValue
                ? 'El docente ahora puede asesorar proyectos.'
                : 'El docente ya no puede asesorar proyectos nuevos.',
        ];
    }
}
