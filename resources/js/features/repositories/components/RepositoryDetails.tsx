import type { Repository } from '../types';

type RepositoryDetailsProps = {
    repositorio: Repository;
};

export const RepositoryDetails = ({ repositorio }: RepositoryDetailsProps) => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold">{repositorio.nombre_rep}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {repositorio.descripcion}
                </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-slate-500">Carrera</dt>
                    <dd className="font-medium">{repositorio.carrera}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Tipo</dt>
                    <dd className="font-medium">{repositorio.tipo_proyecto}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Nivel</dt>
                    <dd className="font-medium">{repositorio.nivel_proyecto}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Empresa</dt>
                    <dd className="font-medium">{repositorio.empresa}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Generación</dt>
                    <dd className="font-medium">{repositorio.generacion}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Visibilidad</dt>
                    <dd className="font-medium">
                        {repositorio.publico ? 'Público' : 'Privado'}
                    </dd>
                </div>
            </dl>

            <div>
                <p className="text-sm text-slate-500">Palabras clave</p>
                <p className="font-medium">{repositorio.palabras_clave}</p>
            </div>

            {repositorio.users.length > 0 ? (
                <div>
                    <p className="mb-2 text-sm text-slate-500">Miembros</p>
                    <ul className="space-y-1 text-sm">
                        {repositorio.users.map((user) => (
                            <li key={user.id}>
                                {user.nombre} {user.apellido} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
