const stats = [
    { value: '+10,200', label: 'Publicaciones' },
    { value: '+10,200', label: 'Alumnos' },
    { value: '+8,200', label: 'Tesis' },
] as const;

export const StatsStrip = () => {
    return (
        <section className="bg-secondary text-secondary-foreground">
            <ul className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
                {stats.map((stat) => (
                    <li key={stat.label} className="text-center">
                        <p className="text-3xl font-bold tracking-wide">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-sm uppercase tracking-wider text-white/85">
                            {stat.label}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
