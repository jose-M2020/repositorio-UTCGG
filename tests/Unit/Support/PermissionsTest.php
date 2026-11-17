<?php

namespace Tests\Unit\Support;

use App\Support\Permissions;
use App\Support\UserRoles;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PermissionsTest extends TestCase
{
    #[Test]
    public function catalog_names_are_unique(): void
    {
        $names = array_column(Permissions::catalog(), 'name');

        $this->assertSame($names, array_values(array_unique($names)));
    }

    #[Test]
    public function section_for_maps_known_and_dynamic_permissions(): void
    {
        $this->assertSame(Permissions::SECTION_MANAGEMENT, Permissions::sectionFor('users.edit'));
        $this->assertSame(Permissions::SECTION_ACTION, Permissions::sectionFor('users.toggle-active'));
        $this->assertSame(Permissions::SECTION_CAREER, Permissions::sectionFor(UserRoles::CAREER_ANY));
        $this->assertSame(Permissions::SECTION_ASSIGN, Permissions::sectionFor('users.assign.teacher'));
    }

    #[Test]
    public function shared_abilities_include_aliased_view_keys(): void
    {
        $abilities = Permissions::sharedAbilities(null);

        $this->assertArrayHasKey('users.view', $abilities);
        $this->assertArrayHasKey('careers.view', $abilities);
        $this->assertArrayHasKey('repositories.create', $abilities);
        $this->assertFalse($abilities['users.view']);
        $this->assertArrayNotHasKey('users.search', $abilities);
    }

    #[Test]
    public function ability_helper_prefixes_can_middleware(): void
    {
        $this->assertSame('can:roles.index', Permissions::ability(Permissions::ROLES_INDEX));
    }

    #[Test]
    public function definitions_use_permission_constants(): void
    {
        $names = array_column(Permissions::definitions(), 'name');

        $this->assertContains(Permissions::ROLES_INDEX, $names);
        $this->assertContains(Permissions::USERS_TOGGLE_ACTIVE, $names);
        $this->assertContains(Permissions::CAREERS_TOGGLE_ACTIVE, $names);
    }
}
