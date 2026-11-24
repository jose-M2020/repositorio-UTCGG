import { USER_ROLE, USER_TYPE, type UserType } from '@/shared/types';
import type { RoleOption } from '../types';

export const defaultRoleForType = (userType: UserType | ''): string => {
  if (userType === USER_TYPE.ACADEMIC) {
    return USER_ROLE.STUDENT;
  }

  if (userType === USER_TYPE.WORKFORCE) {
    return USER_ROLE.TEACHER;
  }

  return '';
};

export const rolesForUserType = (
  roles: RoleOption[],
  userType: UserType | '',
): RoleOption[] => {
  if (!userType) {
    return roles;
  }

  if (userType === USER_TYPE.ACADEMIC) {
    return roles.filter((role) => role.value === USER_ROLE.STUDENT);
  }

  if (userType === USER_TYPE.WORKFORCE) {
    return roles.filter(
      (role) =>
        role.value === USER_ROLE.TEACHER ||
        role.value === USER_ROLE.CAREER_DIRECTOR,
    );
  }

  return roles.filter(
    (role) =>
      role.value !== USER_ROLE.STUDENT &&
      role.value !== USER_ROLE.TEACHER &&
      role.value !== USER_ROLE.CAREER_DIRECTOR,
  );
};
