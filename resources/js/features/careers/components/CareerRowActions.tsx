import { usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/CareerController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { CareerFormDialog } from "./CareerFormDialog";
import { CareerToggleActiveButton } from "./CareerToggleActiveButton";
import type { CareerItem } from "../types";

type CareerRowActionsProps = {
    career: CareerItem;
};

export const CareerRowActions = ({ career }: CareerRowActionsProps) => {
    const { auth } = usePage().props;
    const careerName = career.name.trim();
    const canEdit = auth.abilities["careers.edit"];
    const canToggleActive = auth.abilities["careers.toggle-active"];
    const canDestroy = auth.abilities["careers.destroy"];

    if (!canEdit && !canToggleActive && !canDestroy) {
        return null;
    }

    return (
        <div className="flex justify-end gap-1">
            {canEdit ? (
                <CareerFormDialog
                    mode="edit"
                    career={career}
                    trigger={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Editar ${careerName}`}
                        />
                    }
                    triggerContent={<Pencil aria-hidden="true" />}
                />
            ) : null}
            {canToggleActive ? (
                <CareerToggleActiveButton career={career} />
            ) : null}
            {canDestroy ? (
                <ConfirmDeleteButton
                    form={destroy.form(career.id)}
                    itemLabel={careerName}
                />
            ) : null}
        </div>
    );
};
