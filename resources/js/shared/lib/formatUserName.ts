type NameParts = {
  first_name?: string | null;
  last_name?: string | null;
  second_last_name?: string | null;
};

export const formatUserName = (user: NameParts): string =>
  [user.first_name, user.last_name, user.second_last_name]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(" ")
    .trim();
