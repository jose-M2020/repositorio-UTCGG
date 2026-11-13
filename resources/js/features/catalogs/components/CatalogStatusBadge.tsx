import { cn } from "cn";

type CatalogStatusBadgeProps = {
  isActive: boolean;
};

export const CatalogStatusBadge = ({ isActive }: CatalogStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        isActive
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
          : "bg-muted text-muted-foreground",
      )}
    >
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
};
