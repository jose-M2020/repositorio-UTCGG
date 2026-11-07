import { Link, usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type AppNavLinkProps = {
    href: string;
    label: string;
    icon: LucideIcon;
    onNavigate?: () => void;
};

export const AppNavLink = ({
    href,
    label,
    icon: Icon,
    onNavigate,
}: AppNavLinkProps) => {
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
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            <Icon className="size-4" aria-hidden="true" />
            <span>{label}</span>
        </Link>
    );
};
