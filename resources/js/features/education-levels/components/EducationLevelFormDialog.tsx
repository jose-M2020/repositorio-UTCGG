import { useState, type ReactElement, type ReactNode } from "react";
import { Form } from "@inertiajs/react";
import {
    store,
    update,
} from "@/actions/App/Http/Controllers/EducationLevelController";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui";
import { EducationLevelFormFields } from "./EducationLevelFormFields";
import type { EducationLevelItem } from "../types";

type EducationLevelFormDialogBaseProps = {
    trigger: ReactElement;
    triggerContent: ReactNode;
};

type EducationLevelFormDialogProps = EducationLevelFormDialogBaseProps &
    ({ mode: "create" } | { mode: "edit"; educationLevel: EducationLevelItem });

export const EducationLevelFormDialog = (props: EducationLevelFormDialogProps) => {
    const { trigger, triggerContent, mode } = props;
    const [open, setOpen] = useState(false);
    const isEdit = mode === "edit";
    const educationLevel = isEdit ? props.educationLevel : null;
    const formProps =
        isEdit && educationLevel
            ? update.form(educationLevel.id)
            : store.form();

    const handleSuccess = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar nivel educativo" : "Nuevo nivel educativo"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? `Actualiza ${educationLevel?.code} — ${educationLevel?.name}.`
                            : "Registra un nivel educativo para perfiles y proyectos."}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...formProps}
                    className="space-y-6"
                    onSuccess={handleSuccess}
                >
                    {({ errors, processing }) => (
                        <>
                            <EducationLevelFormFields
                                errors={errors}
                                defaults={
                                    educationLevel
                                        ? {
                                              code: educationLevel.code,
                                              name: educationLevel.name,
                                              sort_order: educationLevel.sort_order,
                                          }
                                        : undefined
                                }
                                isEdit={isEdit}
                            />
                            <DialogFooter>
                                <DialogClose
                                    render={<Button type="button" variant="outline" />}
                                >
                                    Cancelar
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Guardando..."
                                        : isEdit
                                          ? "Actualizar"
                                          : "Guardar"}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};