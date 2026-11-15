export type AccountSettings = {
    first_name: string;
    last_name: string;
    second_last_name: string | null;
    email: string;
    role: string | null;
    career: string | null;
};

export type AccountFormErrors = Record<string, string>;
