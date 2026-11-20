export type ProjectTypeOption = {
    id: number;
    code: string;
    name: string;
};

export type ProjectPeriodItem = {
    id: number;
    name: string;
    project_type_id: number;
    project_type?: string | null;
    project_type_code?: string | null;
    starts_at: string;
    ends_at: string;
    status: "draft" | "open" | "closed";
    status_label: string;
    advisor_default_capacity: number | null;
    effective_default_capacity: number;
    is_team_project?: boolean;
    participants_count?: number;
    repositories_count?: number;
};

export type PaginatedProjectPeriods = {
    data: ProjectPeriodItem[];
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

export type PeriodParticipant = {
    id: number;
    user_id: number;
    name: string;
    email: string;
    career: string | null;
    status: string;
};

export type PeriodCapacity = {
    id: number;
    user_id: number;
    name: string;
    max_projects: number | null;
    is_available: boolean;
    notes: string | null;
};

export type EligibleAdvisor = {
    user_id: number;
    name: string;
    load: number;
    capacity: number;
    ratio: number;
    career_ids: number[];
};

export type PeriodCoverage = {
    by_career: Array<{
        career_id: number;
        career_name: string;
        demand: number;
        repositories: number;
        with_advisor: number;
        without_advisor: number;
        eligible_advisors: number;
    }>;
    by_advisor: Array<{
        user_id: number;
        name: string;
        capacity: number;
        load: number;
        ratio: number;
        is_available: boolean;
        career_ids: number[];
        override_count: number;
    }>;
    suggested_capacity: number;
    alerts: string[];
};

export type CareerOption = {
    id: number;
    code: string;
    name: string;
};

export type DistributionAssignment = {
    repository_id: number;
    advisor_id: number | null;
    career_id?: number | null;
    uncovered?: boolean;
};
