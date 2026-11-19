import { useState, type ReactElement, type ReactNode } from "react";
import { Form } from "@inertiajs/react";
import { store, update } from "@/actions/App/Http/Controllers/CareerController";
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
import { CareerFormFields } from "./CareerFormFields";
import type { CareerItem } from "../../types";

type CareerFormDialogBaseProps = {
    trigger: ReactElement;
    triggerContent: ReactNode;
};

type CareerFormDialogProps = CareerFormDialogBaseProps &
    ({ mode: "create" } | { mode: "edit"; career: CareerItem });

export const CareerFormDialog = (props: CareerFormDialogProps) => {
    const { trigger, triggerContent, mode } = props;
    const [open, setOpen] = useState(false);
    const isEdit = mode === "edit";
    const career = isEdit ? props.career : null;
    const formProps = isEdit && career ? update.form(career.id) : store.form();

    const handleSuccess = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar carrera" : "Nueva carrera"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? `Actualiza ${career?.code} — ${career?.name}.`
                            : "Registra una carrera academica del instituto."}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...formProps}
                    className="space-y-6"
                    encType="multipart/form-data"
                    onSuccess={handleSuccess}
                >
                    {({ errors, processing }) => (
                        <>
                            <CareerFormFields
                                errors={errors}
                                defaults={
                                    career
                                        ? {
                                              code: career.code,
                                              name: career.name,
                                              description: career.description,
                                              image_url: career.image_url,
                                              show_on_home: career.show_on_home,
                                              sort_order: career.sort_order,
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