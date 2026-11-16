import type { RoleOption } from "../types";

export const defaultRoleForType = (userType: string): string => {
  if (userType === "student") {
    return "student";
  }

  if (userType === "teacher") {
    return "teacher";
  }

  return "";
};

export const rolesForUserType = (
  roles: RoleOption[],
  userType: string,
): RoleOption[] => {
  if (!userType) {
    return roles;
  }

  if (userType === "student") {
    return roles.filter((role) => role.value === "student");
  }

  if (userType === "teacher") {
    return roles.filter(
      (role) =>
        role.value === "teacher" || role.value === "career_director",
    );
  }

  return roles.filter(
    (role) =>
      role.value !== "student" &&
      role.value !== "teacher" &&
      role.value !== "career_director",
  );
};
