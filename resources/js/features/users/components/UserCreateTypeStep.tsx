import {
  Button,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import type { UserTypeOption } from "../types";
import { UserTypePicker } from "./UserTypePicker";

type UserCreateTypeStepProps = {
  userTypes: UserTypeOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
};

export const UserCreateTypeStep = ({
  userTypes,
  selectedValue,
  onSelect,
}: UserCreateTypeStepProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>¿Qué tipo de usuario?</DialogTitle>
        <DialogDescription>
          Elige el tipo para mostrar solo los campos que aplican.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <UserTypePicker
          userTypes={userTypes}
          selectedValue={selectedValue}
          onSelect={onSelect}
        />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
        </DialogFooter>
      </div>
    </>
  );
};
