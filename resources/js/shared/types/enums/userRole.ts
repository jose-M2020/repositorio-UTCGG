/**
 * Mirrors App\Support\UserRoles system role names.
 * Custom Spatie roles may exist beyond this set.
 */
export const USER_ROLE = {
  ADMIN: "admin",
  DIRECTOR: "director",
  CAREER_DIRECTOR: "career_director",
  TEACHER: "teacher",
  STUDENT: "student",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const isUserRole = (value: string): value is UserRole =>
  Object.values(USER_ROLE).includes(value as UserRole);
