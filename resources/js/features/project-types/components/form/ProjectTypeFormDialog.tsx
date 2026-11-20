import { useState, type ReactElement, type ReactNode } from "react";
import { Form } from "@inertiajs/react";
import {
    store,
    update,
} from "@/actions/App/Http/Controllers/ProjectTypeController";
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
import { ProjectTypeFormFields } from "./ProjectTypeFormFields";
import type { ProjectTypeItem } from "../../types";

type ProjectTypeFormDialogBaseProps = {
    trigger: ReactElement;
    triggerContent: ReactNode;
};

type ProjectTypeFormDialogProps = ProjectTypeFormDialogBaseProps &
    ({ mode: "create" } | { mode: "edit"; projectType: ProjectTypeItem });

export const ProjectTypeFormDialog = (props: ProjectTypeFormDialogProps) => {
    const { trigger, triggerContent, mode } = props;
    const [open, setOpen] = useState(false);
    const isEdit = mode === "edit";
    const projectType = isEdit ? props.projectType : null;
    const formProps =
        isEdit && projectType
            ? update.form(projectType.id)
            : store.form();

    const handleSuccess = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Editar tipo de proyecto" : "Nuevo tipo de proyecto"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? `Actualiza ${projectType?.code} — ${projectType?.name}.`
                            : "Define reglas y comportamiento para un tipo de proyecto."}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...formProps}
                    className="space-y-6"
                    onSuccess={handleSuccess}
                >
                    {({ errors, processing }) => (
                        <>
                            <ProjectTypeFormFields
                                errors={errors}
                                defaults={
                                    projectType
                                        ? {
                                              code: projectType.code,
                                              name: projectType.name,
                                              description: projectType.description,
                                              is_team_project:
                                                  projectType.is_team_project,
                                              requires_term:
                                                  projectType.requires_term,
                                              requires_internship_flow:
                                                  projectType.requires_internship_flow,
                                              requires_business_advisor:
                                                  projectType.requires_business_advisor,
                                              requires_academic_advisor:
                                                  projectType.requires_academic_advisor,
                                              sort_order: projectType.sort_order,
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