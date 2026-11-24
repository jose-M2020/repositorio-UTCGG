export type EducationLevelItem = {
  id: number;
  code: string;
  name: string;
  sort_order: number;
  is_active: boolean;
};

export type EducationLevelFormValues = {
  id?: number;
  code: string;
  name: string;
  sort_order: number;
};

export type PaginatedEducationLevels = {
  data: EducationLevelItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
};

export type EducationLevelFormErrors = Record<string, string>;
