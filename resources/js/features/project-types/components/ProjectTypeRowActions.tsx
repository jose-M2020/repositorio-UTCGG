import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/ProjectTypeController";
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
    const projectTypeName = projectType.name.trim();

    return (
        <div className="flex justify-end gap-1">
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
            <ProjectTypeToggleActiveButton projectType={projectType} />
            <ConfirmDeleteButton
                form={destroy.form(projectType.id)}
                itemLabel={projectTypeName}
            />
        </div>
    );
};