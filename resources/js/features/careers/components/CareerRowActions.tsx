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
    const careerName = career.name.trim();

    return (
        <div className="flex justify-end gap-1">
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
            <CareerToggleActiveButton career={career} />
            <ConfirmDeleteButton
                form={destroy.form(career.id)}
                itemLabel={careerName}
            />
        </div>
    );
};