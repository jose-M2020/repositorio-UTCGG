import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import type { RepositoryFormErrors } from '../../../shared/types';

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
            className="animate-in fade-in slide-in-from-right-2 space-y-6 duration-300"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Miembros
                </h2>
                <p className="text-[0.8rem] text-muted-foreground">
                    Opcional — puedes agregar miembros ahora o más tarde desde la
                    configuración del repositorio.
                </p>
            </div>

            <div className="space-y-2">
                <UserSearchPicker
                    mode="email"
                    selected={collaborators}
                    onChange={onCollaboratorsChange}
                    max={8}
                    label="Colaboradores"
                />

                {errors.member_emails ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                        {errors.member_emails}
                    </p>
                ) : null}
            </div>
        </section>
    );
};
