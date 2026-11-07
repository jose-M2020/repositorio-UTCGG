<?php

namespace App\Support;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

final class RoleAssignPermissionSync
{
    public static function permissionName(string $roleName): string
    {
        return 'usuarios.assign.'.$roleName;
    }

    public static function ensureFor(string $roleName): Permission
    {
        $permission = Permission::query()->firstOrCreate(
            ['name' => self::permissionName($roleName), 'guard_name' => 'web'],
            ['description' => self::descriptionFor($roleName)],
        );

        if ($permission->description !== self::descriptionFor($roleName)) {
            $permission->update(['description' => self::descriptionFor($roleName)]);
        }

        self::forgetCache();

        return $permission;
    }

    public static function syncAllExistingRoles(): void
    {
        foreach (Role::query()->orderBy('name')->pluck('name') as $roleName) {
            $permission = Permission::query()->firstOrCreate(
                ['name' => self::permissionName((string) $roleName), 'guard_name' => 'web'],
                ['description' => self::descriptionFor((string) $roleName)],
            );

            if ($permission->description !== self::descriptionFor((string) $roleName)) {
                $permission->update(['description' => self::descriptionFor((string) $roleName)]);
            }
        }

        self::forgetCache();
    }

    public static function rename(string $oldRoleName, string $newRoleName): void
    {
        if ($oldRoleName === $newRoleName) {
            return;
        }

        $permission = Permission::query()
            ->where('name', self::permissionName($oldRoleName))
            ->where('guard_name', 'web')
            ->first();

        if ($permission) {
            $permission->update([
                'name' => self::permissionName($newRoleName),
                'description' => self::descriptionFor($newRoleName),
            ]);
        } else {
            self::ensureFor($newRoleName);
        }

        self::forgetCache();
    }

    public static function deleteFor(string $roleName): void
    {
        Permission::query()
            ->where('name', self::permissionName($roleName))
            ->where('guard_name', 'web')
            ->delete();

        self::forgetCache();
    }

    /**
     * @param  list<string>  $permissions
     * @return list<string>
     */
    public static function remapPermissionsAfterRename(
        array $permissions,
        string $oldRoleName,
        string $newRoleName,
    ): array {
        if ($oldRoleName === $newRoleName) {
            return $permissions;
        }

        $oldPermission = self::permissionName($oldRoleName);
        $newPermission = self::permissionName($newRoleName);

        return array_values(array_map(
            fn (string $permission): string => $permission === $oldPermission
                ? $newPermission
                : $permission,
            $permissions,
        ));
    }

    private static function descriptionFor(string $roleName): string
    {
        return 'Asignar rol '.$roleName;
    }

    private static function forgetCache(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
