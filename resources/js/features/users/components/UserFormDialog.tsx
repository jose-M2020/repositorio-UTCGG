import { useState, type ReactElement, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui";
import type {
  CareerFormPolicy,
  RoleOption,
  UserListItem,
  UserTypeOption,
} from "../types";
import { UserCreateTypeStep } from "./UserCreateTypeStep";
import { UserFormStep } from "./UserFormStep";

type CreateStep = "type" | "form";

type UserFormDialogBaseProps = {
  roles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
  userTypes?: UserTypeOption[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When true, caller owns the trigger (e.g. overflow menu item). */
  hideTrigger?: boolean;
  trigger?: ReactElement;
  triggerContent?: ReactNode;
};

type UserFormDialogProps = UserFormDialogBaseProps &
  ({ mode: "create" } | { mode: "edit"; user: UserListItem });

export const UserFormDialog = (props: UserFormDialogProps) => {
  const {
    roles,
    careers,
    careerPolicy,
    userTypes = [],
    trigger,
    triggerContent,
    mode,
    open: openProp,
    onOpenChange,
    hideTrigger = false,
  } = props;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [createStep, setCreateStep] = useState<CreateStep>("type");
  const [selectedUserType, setSelectedUserType] = useState("");
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const isEdit = mode === "edit";
  const user = isEdit ? props.user : null;
  const showTypeStep = !isEdit && createStep === "type" && userTypes.length > 0;

  const resetCreateFlow = () => {
    setCreateStep("type");
    setSelectedUserType("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetCreateFlow();
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleSuccess = () => {
    handleOpenChange(false);
  };

  const handleSelectUserType = (value: string) => {
    setSelectedUserType(value);
    setCreateStep("form");
  };

  const handleBackToTypeStep = () => {
    setCreateStep("type");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && trigger ? (
        <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>
      ) : null}

      <DialogContent className="sm:max-w-2xl">
        {showTypeStep ? (
          <UserCreateTypeStep
            userTypes={userTypes}
            selectedValue={selectedUserType}
            onSelect={handleSelectUserType}
          />
        ) : (
          <UserFormStep
            mode={isEdit ? "edit" : "create"}
            user={user}
            roles={roles}
            careers={careers}
            careerPolicy={careerPolicy}
            userTypes={userTypes}
            selectedUserType={selectedUserType}
            onBackToTypeStep={
              !isEdit && userTypes.length > 0
                ? handleBackToTypeStep
                : undefined
            }
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
