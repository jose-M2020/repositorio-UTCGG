import { Head } from '@inertiajs/react';
import {
  RolesIndexContainer,
  type PaginatedRoles,
  type PermissionGroups,
} from '@/features/roles';

type RolesIndexPageProps = {
  roles: PaginatedRoles;
  permissionGroups: PermissionGroups;
};

const RolesIndexPage = ({ roles, permissionGroups }: RolesIndexPageProps) => {
  return (
    <>
      <Head title="Roles" />
      <RolesIndexContainer roles={roles} permissionGroups={permissionGroups} />
    </>
  );
};

export default RolesIndexPage;
