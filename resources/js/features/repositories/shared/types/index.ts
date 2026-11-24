export type RepositoryMember = {
  id: number;
  first_name: string;
  last_name: string;
  second_last_name?: string | null;
  email: string;
};

export type RepositoryFileItem = {
  id: number;
  original_name: string;
  file_type: string;
  is_public: boolean;
  url?: string;
};

export type RepositoryAdvisorSummary = {
  id: number;
  user_id?: number;
  name: string | null;
  assigned_at: string | null;
  released_at?: string | null;
  override_reason?: string | null;
};

export type EligibleAdvisorOption = {
  id: number;
  name: string;
  load: number;
  capacity: number;
  label: string;
};

export type RepositoryAddress = {
  id?: number;
  street_line: string;
  street_line_2?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  references?: string | null;
  formatted?: string;
};

export type RepositoryCompany = {
  id?: number;
  name: string;
  rfc?: string | null;
  sector?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: RepositoryAddress | null;
  notes?: string | null;
};

export type RepositoryBusinessAdvisor = {
  id?: number;
  business_advisor_id?: number | null;
  affiliation_id?: number | null;
  first_name: string;
  last_name: string;
  second_last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  job_title?: string | null;
  department?: string | null;
  notes?: string | null;
  acceptance_status?: string;
  confirmed_via?: string | null;
  full_name?: string;
  catalog_status?: string | null;
};

export type Repository = {
  id: number;
  title: string;
  slug: string;
  description: string;
  project_type: string;
  requires_academic_advisor?: boolean;
  requires_business_advisor?: boolean;
  academic_degree: string;
  keywords: string;
  is_public: boolean;
  career: string;
  project_period_id?: number | null;
  project_period?: {
    id: number;
    name: string;
    status: string;
  } | null;
  active_advisor?: RepositoryAdvisorSummary | null;
  advisor_history?: RepositoryAdvisorSummary[];
  company: RepositoryCompany | null;
  business_advisor?: RepositoryBusinessAdvisor | null;
  generation: string;
  created_by: string;
  users: RepositoryMember[];
  files: RepositoryFileItem[];
  images: string[];
  image_urls?: string[];
  cover_url?: string;
  visibility?: 'public' | 'private';
};

export type RepositoryListItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  career: string;
  project_type: string;
  academic_degree: string;
  is_public: boolean;
  created_at?: string;
  cover_url?: string;
  users?: RepositoryMember[];
};

export type RepositoryFilters = {
  query: string;
  search_field: string;
  career: string[];
  project_type: string[];
  academic_degree: string[];
  year: string[];
};

export type PaginatedRepositories = {
  data: RepositoryListItem[];
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

export type RepositoryFormErrors = Record<string, string>;

export type RepositoryLookups = {
  careers: Record<string, string>;
  project_types: Record<string, string>;
  education_levels: Record<string, string>;
  project_types_meta?: Array<{
    code: string;
    requires_academic_advisor: boolean;
    requires_business_advisor?: boolean;
  }>;
  open_periods?: Array<{
    id: number;
    name: string;
    project_type_code: string;
  }>;
};
