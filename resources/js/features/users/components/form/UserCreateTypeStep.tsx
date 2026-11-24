import {
  Button,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import type { UserType } from '@/shared/types';
import type { UserTypeOption } from '../../types';
import { UserTypePicker } from './UserTypePicker';

type UserCreateTypeStepProps = {
  userTypes: UserTypeOption[];
  selectedValue?: UserType | '';
  onSelect: (value: UserType) => void;
};

export const UserCreateTypeStep = ({
  userTypes,
  selectedValue,
  onSelect,
}: UserCreateTypeStepProps) => {
  return (
    <>
      <DialogHeader className="shrink-0 gap-1.5 border-b border-border px-6 py-5 pr-14">
        <DialogTitle>¿Qué tipo de usuario?</DialogTitle>
        <DialogDescription>
          Elige el tipo para mostrar solo los campos que aplican.
        </DialogDescription>
      </DialogHeader>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
        <UserTypePicker
          userTypes={userTypes}
          selectedValue={selectedValue}
          onSelect={onSelect}
        />
      </div>

      <DialogFooter className="m-0 shrink-0 rounded-none border-t border-border px-6 py-4">
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancelar
        </DialogClose>
      </DialogFooter>
    </>
  );
};
