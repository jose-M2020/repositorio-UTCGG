import { usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/ProjectTypeController";
import { AUTH_ABILITIES } from "@/features/auth";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { ProjectTypeFormDialog } from "./ProjectTypeFormDialog";
import { ProjectTypeToggleActiveButton } from "./ProjectTypeToggleActiveButton";
import type { ProjectTypeItem } from "../types";

type ProjectTypeRowActionsProps = {
    projectType: ProjectTypeItem;
};

export const ProjectTypeRowActions = ({
    projectType,
}: ProjectTypeRowActionsProps) => {
    const { auth } = usePage().props;
    const projectTypeName = projectType.name.trim();
    const canEdit = auth.abilities[AUTH_ABILITIES.PROJECT_TYPES_EDIT];
    const canToggleActive = auth.abilities[AUTH_ABILITIES.PROJECT_TYPES_TOGGLE_ACTIVE];
    const canDestroy = auth.abilities[AUTH_ABILITIES.PROJECT_TYPES_DESTROY];

    if (!canEdit && !canToggleActive && !canDestroy) {
        return null;
    }

    return (
        <div className="flex justify-end gap-1">
            {canEdit ? (
                <ProjectTypeFormDialog
                    mode="edit"
                    projectType={projectType}
                    trigger={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Editar ${projectTypeName}`}
                        />
                    }
                    triggerContent={<Pencil aria-hidden="true" />}
                />
            ) : null}
            {canToggleActive ? (
                <ProjectTypeToggleActiveButton projectType={projectType} />
            ) : null}
            {canDestroy ? (
                <ConfirmDeleteButton
                    form={destroy.form(projectType.id)}
                    itemLabel={projectTypeName}
                />
            ) : null}
        </div>
    );
};
