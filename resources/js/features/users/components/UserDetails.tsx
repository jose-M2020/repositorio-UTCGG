import type { UserDetails as UserDetailsType } from '../types';

type UserDetailsProps = {
    user: UserDetailsType;
};

export const UserDetails = ({ user }: UserDetailsProps) => {
    return (
        <dl className="grid gap-4 sm:grid-cols-2">
            <div>
                <dt className="text-sm text-slate-500">Nombre</dt>
                <dd className="font-medium">
                    {user.nombre} {user.apellido}
                </dd>
            </div>
            <div>
                <dt className="text-sm text-slate-500">Correo</dt>
                <dd className="font-medium">{user.email}</dd>
            </div>
            <div>
                <dt className="text-sm text-slate-500">Carrera</dt>
                <dd className="font-medium">{user.carrera ?? '—'}</dd>
            </div>
            <div>
                <dt className="text-sm text-slate-500">Roles</dt>
                <dd className="font-medium">
                    {user.roles.length > 0 ? user.roles.join(', ') : '—'}
                </dd>
            </div>
            <div>
                <dt className="text-sm text-slate-500">Creado</dt>
                <dd className="font-medium">{user.created_at ?? '—'}</dd>
            </div>
        </dl>
    );
};
