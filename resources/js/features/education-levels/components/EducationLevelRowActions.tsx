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
    const educationLevelName = educationLevel.name.trim();

    return (
        <div className="flex justify-end gap-1">
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
            <EducationLevelToggleActiveButton educationLevel={educationLevel} />
            <ConfirmDeleteButton
                form={destroy.form(educationLevel.id)}
                itemLabel={educationLevelName}
            />
        </div>
    );
};