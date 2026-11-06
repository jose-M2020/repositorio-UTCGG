import type { ReactNode } from 'react';

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const highlightMatch = (
    text: string,
    query: string,
): ReactNode => {
    const term = query.trim();

    if (term === '' || text === '') {
        return text;
    }

    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
        if (part.toLowerCase() !== term.toLowerCase()) {
            return <span key={`${part}-${index}`}>{part}</span>;
        }

        return (
            <mark
                key={`${part}-${index}`}
                className="rounded-sm bg-accent px-0.5 text-accent-foreground"
            >
                {part}
            </mark>
        );
    });
};
