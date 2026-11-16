import { useState } from "react";
import { Form } from "@inertiajs/react";
import { Power, PowerOff } from "lucide-react";
import { toggleActive } from "@/actions/App/Http/Controllers/CareerController";
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
import type { CareerItem } from "../types";

type CareerToggleActiveButtonProps = {
    career: CareerItem;
};

export const CareerToggleActiveButton = ({
    career,
}: CareerToggleActiveButtonProps) => {
    const [open, setOpen] = useState(false);
    const careerName = career.name.trim();
    const willActivate = !career.is_active;
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
                        aria-label={`${actionLabel} ${careerName}`}
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
                            {careerName}
                        </span>
                        ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {willActivate
                            ? "La carrera quedara disponible para asignaciones y catalogos."
                            : "La carrera dejara de estar disponible para nuevas asignaciones."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Form {...toggleActive.form(career.id)} onSuccess={handleSuccess}>
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