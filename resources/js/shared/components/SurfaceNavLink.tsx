import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/shared/lib/cn';

type SurfaceNavLinkProps = {
    href: string;
    children: string;
    onNavigate?: () => void;
};

export const SurfaceNavLink = ({
    href,
    children,
    onNavigate,
}: SurfaceNavLinkProps) => {
    const { url } = usePage();
    const currentPath = url.split('?')[0] ?? url;
    const linkPath = href.split('?')[0] ?? href;
    const isActive =
        currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(`${linkPath}/`));

    return (
        <Link
            href={href}
            onClick={onNavigate}
            className={cn(
                'flex rounded-md px-2 py-1.5 text-sm hover:bg-muted',
                isActive
                    ? 'bg-muted font-medium text-primary'
                    : 'text-foreground',
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
};
