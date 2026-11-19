/**
 * Mirrors App\Enums\UserType.
 */
export const USER_TYPE = {
  ACADEMIC: "academic",
  WORKFORCE: "workforce",
  STAFF: "staff",
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export const isUserType = (value: string): value is UserType =>
  Object.values(USER_TYPE).includes(value as UserType);
