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
        <main className="flex flex-1 items-center justify-center bg-muted/40 px-4 py-10">
            <section
                className={`w-full ${maxWidthClassName} rounded-xl border border-border bg-background p-6 shadow-sm`}
            >
                {hasHeader ? (
                    <header className="mb-6 space-y-1">
                        {title ? (
                            <h1 className="text-2xl font-semibold text-foreground">
                                {title}
                            </h1>
                        ) : null}
                        {description ? (
                            <div className="text-sm text-muted-foreground">
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
