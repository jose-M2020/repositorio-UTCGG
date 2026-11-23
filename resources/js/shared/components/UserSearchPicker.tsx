import { useEffect, useId, useState } from 'react';
import { search } from '@/actions/App/Http/Controllers/UserController';
import { Button, Input } from '@/shared/components/ui';
import { formatUserName } from '@/shared/lib';

export type SearchableUser = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name?: string | null;
    email: string;
    roles?: Array<{ name: string }>;
};

type UserSearchPickerProps = {
    mode: 'email' | 'id';
    selected: SearchableUser[];
    onChange: (users: SearchableUser[]) => void;
    max?: number;
    label?: string;
    /** Spatie role filter forwarded to users.search (`student` | `teacher`). */
    role?: 'student' | 'teacher';
    description?: string;
};

type SearchResponse = {
    data: SearchableUser[];
    current_page: number;
    last_page: number;
};

export const UserSearchPicker = ({
    mode,
    selected,
    onChange,
    max = 8,
    label = 'Buscar colaboradores',
    role,
    description,
}: UserSearchPickerProps) => {
    const listId = useId();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchableUser[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const timeout = window.setTimeout(async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    search.url(undefined, {
                        query: {
                            query,
                            page,
                            ...(role ? { role } : {}),
                        },
                    }),
                    {
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    },
                );

                if (!response.ok) {
                    throw new Error('No se pudo buscar usuarios.');
                }

                const payload = (await response.json()) as SearchResponse;
                setResults((current) =>
                    page === 1 ? payload.data : [...current, ...payload.data],
                );
                setLastPage(payload.last_page);
            } catch (fetchError) {
                setError(
                    fetchError instanceof Error
                        ? fetchError.message
                        : 'Error de búsqueda',
                );
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [query, page, role]);

    const handleSelect = (user: SearchableUser) => {
        if (selected.some((item) => item.id === user.id)) {
            return;
        }

        if (selected.length >= max) {
            setError(`Máximo ${max} colaboradores.`);
            return;
        }

        onChange([...selected, user]);
        setQuery('');
        setResults([]);
        setPage(1);
    };

    const handleRemove = (userId: number) => {
        onChange(selected.filter((user) => user.id !== userId));
    };

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <label
                    htmlFor={listId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {description ? (
                    <p className="text-[0.8rem] text-muted-foreground">
                        {description}
                    </p>
                ) : null}
                <Input
                    id={listId}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setPage(1);
                    }}
                    placeholder="Buscar por nombre, apellido o correo"
                    aria-label={label}
                    autoComplete="off"
                />
            </div>

            {error ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                    {error}
                </p>
            ) : null}
            {loading ? (
                <p className="text-[0.8rem] text-muted-foreground">
                    Buscando...
                </p>
            ) : null}

            {results.length > 0 ? (
                <ul className="max-h-48 overflow-y-auto rounded-lg border border-border bg-card">
                    {results.map((user) => (
                        <li key={user.id}>
                            <button
                                type="button"
                                className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-muted"
                                onClick={() => handleSelect(user)}
                            >
                                <span className="font-medium text-foreground">
                                    {formatUserName(user)}
                                </span>
                                <span className="text-muted-foreground">
                                    {user.email}
                                </span>
                            </button>
                        </li>
                    ))}
                    {page < lastPage ? (
                        <li className="border-t border-border p-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => setPage((current) => current + 1)}
                            >
                                Cargar más
                            </Button>
                        </li>
                    ) : null}
                </ul>
            ) : null}

            {selected.length > 0 ? (
                <ul className="space-y-2">
                    {selected.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm"
                        >
                            <div>
                                <p className="font-medium">
                                    {formatUserName(user)}
                                </p>
                                <p className="text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemove(user.id)}
                                aria-label={`Quitar a ${user.first_name}`}
                            >
                                Quitar
                            </Button>
                            <input
                                type="hidden"
                                name={mode === 'email' ? 'member_emails[]' : 'user_ids[]'}
                                value={mode === 'email' ? user.email : user.id}
                            />
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
