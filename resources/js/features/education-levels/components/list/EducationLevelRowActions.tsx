import { usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/EducationLevelController";
import { AUTH_ABILITIES } from "@/features/auth";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { EducationLevelFormDialog } from "../form/EducationLevelFormDialog";
import { EducationLevelToggleActiveButton } from "./EducationLevelToggleActiveButton";
import type { EducationLevelItem } from "../../types";

type EducationLevelRowActionsProps = {
    educationLevel: EducationLevelItem;
};

export const EducationLevelRowActions = ({
    educationLevel,
}: EducationLevelRowActionsProps) => {
    const { auth } = usePage().props;
    const educationLevelName = educationLevel.name.trim();
    const canEdit = auth.abilities[AUTH_ABILITIES.EDUCATION_LEVELS_EDIT];
    const canToggleActive =
        auth.abilities[AUTH_ABILITIES.EDUCATION_LEVELS_TOGGLE_ACTIVE];
    const canDestroy = auth.abilities[AUTH_ABILITIES.EDUCATION_LEVELS_DESTROY];

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
