export type PasswordRequirement = {
    id: string;
    label: string;
    test: (password: string) => boolean;
};

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
    {
        id: 'minLength',
        label: 'Al menos 8 caracteres',
        test: (password) => password.length >= 8,
    },
    {
        id: 'mixedCase',
        label: 'Mayúsculas y minúsculas',
        test: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
        id: 'number',
        label: 'Al menos un número',
        test: (password) => /\d/.test(password),
    },
    {
        id: 'symbol',
        label: 'Al menos un símbolo',
        test: (password) => /[^A-Za-z0-9]/.test(password),
    },
];

export const passwordMeetsRequirements = (password: string): boolean =>
    PASSWORD_REQUIREMENTS.every((requirement) => requirement.test(password));
