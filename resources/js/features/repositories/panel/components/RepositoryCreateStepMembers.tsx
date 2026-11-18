import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import type { RepositoryFormErrors } from '../../shared/types';

type RepositoryCreateStepMembersProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
    collaborators: SearchableUser[];
    onCollaboratorsChange: (users: SearchableUser[]) => void;
};

export const RepositoryCreateStepMembers = ({
    errors,
    isActive,
    collaborators,
    onCollaboratorsChange,
}: RepositoryCreateStepMembersProps) => {
    return (
        <section
            className="space-y-4"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-secondary">
                    Miembros
                </h2>
                <p className="text-sm text-muted-foreground">
                    Opcional — puedes agregar miembros ahora o más tarde desde la
                    configuración del repositorio.
                </p>
            </div>

            <UserSearchPicker
                mode="email"
                selected={collaborators}
                onChange={onCollaboratorsChange}
                max={8}
                label="Miembro(s)"
            />

            {errors.member_emails ? (
                <p className="text-sm text-destructive">{errors.member_emails}</p>
            ) : null}
        </section>
    );
};
