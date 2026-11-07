import { Input } from '@/shared/components/ui';
import type {
    PermissionGroups,
    RoleFormErrors,
    RoleFormValues,
} from '../types';
import { RolePermissionGroups } from './RolePermissionGroups';

type RoleFormFieldsProps = {
    errors: RoleFormErrors;
    permissionGroups: PermissionGroups;
    defaults?: Pick<RoleFormValues, 'name' | 'permissions'>;
};

export const RoleFormFields = ({
    errors,
    permissionGroups,
    defaults,
}: RoleFormFieldsProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                >
                    Nombre del rol
                </label>
                <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={defaults?.name}
                    aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                    <p className="text-sm text-destructive">{errors.name}</p>
                ) : null}
            </div>

            <RolePermissionGroups
                permissionGroups={permissionGroups}
                selected={defaults?.permissions ?? []}
                errors={errors}
            />
        </div>
    );
};
