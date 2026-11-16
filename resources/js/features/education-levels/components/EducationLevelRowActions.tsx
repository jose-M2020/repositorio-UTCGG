import { usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/EducationLevelController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { EducationLevelFormDialog } from "./EducationLevelFormDialog";
import { EducationLevelToggleActiveButton } from "./EducationLevelToggleActiveButton";
import type { EducationLevelItem } from "../types";

type EducationLevelRowActionsProps = {
    educationLevel: EducationLevelItem;
};

export const EducationLevelRowActions = ({
    educationLevel,
}: EducationLevelRowActionsProps) => {
    const { auth } = usePage().props;
    const educationLevelName = educationLevel.name.trim();
    const canEdit = auth.abilities["education_levels.edit"];
    const canToggleActive = auth.abilities["education_levels.toggle-active"];
    const canDestroy = auth.abilities["education_levels.destroy"];

    if (!canEdit && !canToggleActive && !canDestroy) {
        return null;
    }

    return (
        <div className="flex justify-end gap-1">
            {canEdit ? (
                <EducationLevelFormDialog
                    mode="edit"
                    educationLevel={educationLevel}
                    trigger={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Editar ${educationLevelName}`}
                        />
                    }
                    triggerContent={<Pencil aria-hidden="true" />}
                />
            ) : null}
            {canToggleActive ? (
                <EducationLevelToggleActiveButton
                    educationLevel={educationLevel}
                />
            ) : null}
            {canDestroy ? (
                <ConfirmDeleteButton
                    form={destroy.form(educationLevel.id)}
                    itemLabel={educationLevelName}
                />
            ) : null}
        </div>
    );
};
