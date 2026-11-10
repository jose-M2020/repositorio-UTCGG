import { Link } from '@inertiajs/react';
import { about, index as home } from '@/actions/App/Http/Controllers/HomeController';

export const PublicFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-border bg-card">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 text-center">
                <Link href={home.url()} className="inline-flex justify-center">
                    <img
                        src="/img/logo.png"
                        alt="UTCGG"
                        className="h-12 w-auto"
                    />
                </Link>

                <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-foreground">
                    <li>
                        <Link href={home.url()} className="hover:text-primary">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href={about.url()} className="hover:text-primary">
                            Acerca
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary">
                            Terminos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary">
                            Privacidad
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary">
                            Contacto
                        </a>
                    </li>
                </ul>

                <ul className="mt-4 flex items-center justify-center gap-3 text-sm text-secondary">
                    <li>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Twitter"
                        >
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            Instagram
                        </a>
                    </li>
                </ul>

                <p className="mt-8 text-sm text-muted-foreground">
                    Copyright ©{year} All rights reserved
                </p>
            </div>
        </footer>
    );
};
