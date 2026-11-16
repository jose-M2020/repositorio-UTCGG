import { Briefcase, GraduationCap, School, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib";
import type { UserTypeOption } from "../types";

type UserTypePickerProps = {
  userTypes: UserTypeOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  error?: string;
};

type UserTypeMeta = {
  icon: LucideIcon;
  description: string;
};

const USER_TYPE_META: Record<string, UserTypeMeta> = {
  student: {
    icon: GraduationCap,
    description: "Alumnos con matrícula y carrera.",
  },
  teacher: {
    icon: School,
    description: "Docentes y directores de carrera.",
  },
  staff: {
    icon: Briefcase,
    description: "Personal administrativo u operativo.",
  },
};

export const UserTypePicker = ({
  userTypes,
  selectedValue,
  onSelect,
  error,
}: UserTypePickerProps) => {
  return (
    <div className="space-y-3">
      <div
        className="grid gap-3 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Tipo de usuario"
      >
        {userTypes.map((type) => {
          const meta = USER_TYPE_META[type.value];
          const Icon = meta?.icon ?? Briefcase;
          const isSelected = selectedValue === type.value;

          return (
            <button
              key={type.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(type.value)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left transition-colors",
                "hover:border-primary/40 hover:bg-accent/40",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30"
                  : "border-border",
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="space-y-1">
                <span className="block text-sm font-semibold text-foreground">
                  {type.label}
                </span>
                <span className="block text-xs leading-relaxed text-muted-foreground">
                  {meta?.description ?? "Selecciona este tipo de usuario."}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
};
