import type { ReactNode } from 'react';

type AuthShellProps = {
    title?: string;
    description?: ReactNode;
    children: ReactNode;
    maxWidthClassName?: string;
};

export const AuthShell = ({
    title,
    description,
    children,
    maxWidthClassName = 'max-w-md',
}: AuthShellProps) => {
    const hasHeader = Boolean(title || description);

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
            <section
                className={`w-full ${maxWidthClassName} rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900`}
            >
                {hasHeader ? (
                    <header className="mb-6 space-y-1">
                        {title ? (
                            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                {title}
                            </h1>
                        ) : null}
                        {description ? (
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                {description}
                            </div>
                        ) : null}
                    </header>
                ) : null}
                {children}
            </section>
        </main>
    );
};
