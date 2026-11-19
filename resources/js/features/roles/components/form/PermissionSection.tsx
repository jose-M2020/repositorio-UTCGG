import { Checkbox } from "@/shared/components/ui/checkbox";
import type { RolePermission } from "../../types";
import { permissionLabel } from "../../utils/permissionDisplay";

type PermissionSectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  permissions: RolePermission[];
  checkedState: Set<string>;
  isAllChecked: (permissions: RolePermission[]) => boolean;
  isIndeterminate: (permissions: RolePermission[]) => boolean;
  onToggleGroup: (permissions: RolePermission[]) => void;
  onTogglePermission: (name: string, checked: boolean) => void;
};

export const PermissionSection = ({
  eyebrow,
  title,
  description,
  permissions,
  checkedState,
  isAllChecked,
  isIndeterminate,
  onToggleGroup,
  onTogglePermission,
}: PermissionSectionProps) => {
  if (permissions.length === 0) {
    return null;
  }

  const selectedCount = permissions.filter((permission) =>
    checkedState.has(permission.name),
  ).length;

  return (
    <div className="rounded-lg border border-border/80 bg-muted/20">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-3 py-2.5">
        <div className="min-w-0 space-y-0.5">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          {description ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {selectedCount}/{permissions.length}
          </span>
          <label className="inline-flex items-center gap-2 text-xs text-foreground">
            <Checkbox
              checked={isAllChecked(permissions)}
              indeterminate={isIndeterminate(permissions)}
              onCheckedChange={() => onToggleGroup(permissions)}
            />
            <span>Todos</span>
          </label>
        </div>
      </div>

      <div className="grid gap-x-3 gap-y-1 p-2 sm:grid-cols-2">
        {permissions.map((permission) => (
          <label
            key={permission.id}
            className="flex items-start gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-background/80"
          >
            <Checkbox
              checked={checkedState.has(permission.name)}
              onCheckedChange={(checked) =>
                onTogglePermission(permission.name, checked === true)
              }
              className="mt-0.5"
            />
            <span className="leading-snug">{permissionLabel(permission)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
