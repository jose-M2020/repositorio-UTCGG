import { Link } from '@inertiajs/react';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';

type AppBrandProps = {
    href?: string;
    label?: string;
};

export const AppBrand = ({
    href = home.url(),
    label = 'Repositorio UTCGG',
}: AppBrandProps) => {
    return (
        <Link
            href={href}
            className="flex min-w-0 items-center"
            aria-label={`Inicio ${label}`}
        >
            <img
                src="/img/logo1.png"
                alt=""
                className="h-10 max-w-full object-contain object-left"
            />
        </Link>
    );
};
