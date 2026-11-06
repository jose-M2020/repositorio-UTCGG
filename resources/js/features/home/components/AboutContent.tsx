export const AboutContent = () => {
    return (
        <article className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
            <div className="flex justify-center">
                <img
                    src="/img/about.svg"
                    alt="Universidad Tecnológica de la Costa Grande de Guerrero"
                    className="max-h-[28rem] w-full max-w-md object-contain"
                />
            </div>

            <div className="space-y-5">
                <header className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                        Universidad Tecnológica de la Costa Grande de Guerrero
                    </h1>
                    <p className="text-lg text-secondary">Repositorio Digital</p>
                </header>

                <div className="space-y-4 text-base leading-relaxed text-foreground">
                    <p>
                        Los repositorios académicos de la UTCGG son una
                        plataforma digital que proporciona acceso abierto en
                        texto completo a diversos recursos de información
                        académica, como proyectos de estadía, integradora y
                        proyectos especiales.
                    </p>
                    <p>
                        Esta plataforma tiene como objetivo almacenar, preservar
                        y difundir la producción científica y académica de la
                        comunidad en formato digital. Forma parte del movimiento
                        internacional Open Access Initiative, que promueve el
                        acceso libre a la literatura científica e incrementa el
                        impacto de los trabajos desarrollados.
                    </p>
                    <p>
                        Buscamos maximizar la visibilidad, el uso y el impacto
                        de la producción científica y académica de la comunidad
                        universitaria.
                    </p>
                </div>
            </div>
        </article>
    );
};
