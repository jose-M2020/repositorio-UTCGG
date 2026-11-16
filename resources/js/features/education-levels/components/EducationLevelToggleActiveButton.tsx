import { useState } from "react";
import { Form } from "@inertiajs/react";
import { Power, PowerOff } from "lucide-react";
import { toggleActive } from "@/actions/App/Http/Controllers/EducationLevelController";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
} from "@/shared/components/ui";
import type { EducationLevelItem } from "../types";

type EducationLevelToggleActiveButtonProps = {
    educationLevel: EducationLevelItem;
};

export const EducationLevelToggleActiveButton = ({
    educationLevel,
}: EducationLevelToggleActiveButtonProps) => {
    const [open, setOpen] = useState(false);
    const educationLevelName = educationLevel.name.trim();
    const willActivate = !educationLevel.is_active;
    const actionLabel = willActivate ? "Activar" : "Desactivar";
    const Icon = willActivate ? Power : PowerOff;

    const handleSuccess = () => {
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`${actionLabel} ${educationLevelName}`}
                    />
                }
            >
                <Icon aria-hidden="true" />
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia
                        className={
                            willActivate
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        }
                    >
                        <Icon aria-hidden="true" />
                    </AlertDialogMedia>
                    <AlertDialogTitle className="font-normal">
                        ¿{actionLabel}{" "}
                        <span className="font-semibold text-foreground">
                            {educationLevelName}
                        </span>
                        ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {willActivate
                            ? "El nivel educativo quedara disponible para perfiles y asignaciones."
                            : "El nivel dejara de estar disponible para nuevas asignaciones."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Form
                        {...toggleActive.form(educationLevel.id)}
                        onSuccess={handleSuccess}
                    >
                        {({ processing }) => (
                            <AlertDialogAction type="submit" disabled={processing}>
                                {processing ? "Guardando..." : actionLabel}
                            </AlertDialogAction>
                        )}
                    </Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};