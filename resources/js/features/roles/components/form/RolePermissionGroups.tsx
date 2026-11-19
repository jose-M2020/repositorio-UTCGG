import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "cn";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui";
import { usePermissionModuleScrollSpy } from "../../hooks/usePermissionModuleScrollSpy";
import { usePermissionSelection } from "../../hooks/usePermissionSelection";
import type { PermissionGroups, RoleFormErrors } from "../../types";
import { filterPermissionGroups } from "../../utils/filterPermissionGroups";
import { moduleSectionId } from "../../utils/moduleSectionId";
import {
  moduleLabel,
  partitionPermissions,
} from "../../utils/permissionDisplay";
import { PermissionSection } from "./PermissionSection";

type RolePermissionGroupsProps = {
  permissionGroups: PermissionGroups;
  selected?: string[];
  errors?: RoleFormErrors;
};

export const RolePermissionGroups = ({
  permissionGroups,
  selected = [],
  errors,
}: RolePermissionGroupsProps) => {
  const groups = Object.entries(permissionGroups);
  const moduleNames = Object.keys(permissionGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim();

  const {
    checkedState,
    selectedCount,
    togglePermission,
    toggleGroup,
    isAllChecked,
    isIndeterminate,
  } = usePermissionSelection(selected);

  const { activeModule, scrollContainerRef, navigateToModule } =
    usePermissionModuleScrollSpy({
      moduleNames,
      initialModule: moduleNames[0] ?? "",
      observeKey: normalizedQuery,
    });

  if (groups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay permisos registrados.
      </p>
    );
  }

  const visibleGroups = filterPermissionGroups(
    permissionGroups,
    normalizedQuery,
  );
  const allPermissions = groups.flatMap(([, permissions]) => permissions);
  const visiblePermissions = visibleGroups.flatMap(
    ([, permissions]) => permissions,
  );
  const selectablePermissions = normalizedQuery === "" ? allPermissions : visiblePermissions;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Permisos</p>
          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <Checkbox
              checked={isAllChecked(selectablePermissions)}
              indeterminate={isIndeterminate(selectablePermissions)}
              onCheckedChange={() => toggleGroup(selectablePermissions)}
              disabled={selectablePermissions.length === 0}
            />
            <span>
              {normalizedQuery === ""
                ? "Seleccionar todos"
                : "Seleccionar resultados"}
            </span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {selectedCount === 1
            ? "1 permiso seleccionado"
            : `${selectedCount} permisos seleccionados`}
        </p>
      </div>

      {[...checkedState].map((name) => (
        <input
          key={name}
          type="hidden"
          name="permissions[]"
          value={name}
        />
      ))}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border">
        <div className="grid h-full min-h-0 flex-1 md:grid-cols-[12rem_1fr]">
          <nav
            className="sticky top-0 z-10 flex shrink-0 gap-1 self-start overflow-x-auto border-b border-border bg-muted/40 p-2 md:sticky md:top-0 md:h-full md:flex-col md:self-stretch md:overflow-y-auto md:border-r md:border-b-0"
            aria-label="Ir a módulo de permisos"
          >
            {groups.map(([moduleName, permissions]) => {
              const selectedInModule = permissions.filter((permission) =>
                checkedState.has(permission.name),
              ).length;
              const isActive = moduleName === activeModule;
              const isHiddenBySearch =
                normalizedQuery !== "" &&
                !visibleGroups.some(([name]) => name === moduleName);

              return (
                <button
                  key={moduleName}
                  type="button"
                  onClick={() => navigateToModule(moduleName)}
                  disabled={isHiddenBySearch}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                    isActive
                      ? "bg-background font-medium text-primary shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
                    isHiddenBySearch && "pointer-events-none opacity-40",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="truncate">{moduleLabel(moduleName)}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                      selectedInModule > 0
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {selectedInModule}/{permissions.length}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="shrink-0 border-b border-border p-3">
              <label className="relative block">
                <span className="sr-only">Buscar permisos</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Buscar permisos..."
                  className="h-8 pl-8"
                  aria-label="Buscar permisos"
                />
              </label>
            </div>

            <div
              ref={scrollContainerRef}
              className="min-h-0 flex-1 space-y-6 overflow-y-auto p-3 scroll-smooth"
            >
              {visibleGroups.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No hay permisos que coincidan con la búsqueda.
                </p>
              ) : (
                visibleGroups.map(([moduleName, permissions]) => {
                  const partitioned = partitionPermissions(permissions);
                  const hasNestedSections =
                    partitioned.actions.length > 0 ||
                    partitioned.assign.length > 0 ||
                    partitioned.career.length > 0;
                  const selectedInModule = permissions.filter((permission) =>
                    checkedState.has(permission.name),
                  ).length;

                  return (
                    <section
                      key={moduleName}
                      id={moduleSectionId(moduleName)}
                      data-module={moduleName}
                      className="scroll-mt-2 overflow-hidden rounded-xl border border-border"
                    >
                      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Módulo
                          </p>
                          <h3 className="truncate text-base font-semibold text-foreground">
                            {moduleLabel(moduleName)}
                          </h3>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <label className="inline-flex items-center gap-2 text-xs text-foreground">
                            <Checkbox
                              checked={isAllChecked(permissions)}
                              indeterminate={isIndeterminate(permissions)}
                              onCheckedChange={() => toggleGroup(permissions)}
                            />
                            <span>Todo el módulo</span>
                          </label>
                          <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground tabular-nums ring-1 ring-border">
                            {selectedInModule}/{permissions.length}
                          </span>
                        </div>
                      </header>

                      <div className="space-y-3 bg-background p-3">
                        {hasNestedSections ? (
                          <>
                            <PermissionSection
                              eyebrow="CRUD"
                              title="Gestión"
                              description="Ver, crear, editar, eliminar y buscar en este módulo."
                              permissions={partitioned.management}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={toggleGroup}
                              onTogglePermission={togglePermission}
                            />
                            <PermissionSection
                              eyebrow="Operaciones"
                              title="Acciones específicas"
                              description="Operaciones puntuales aparte del CRUD (activar, cambiar rol, enviar enlace, etc.)."
                              permissions={partitioned.actions}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={toggleGroup}
                              onTogglePermission={togglePermission}
                            />
                            <PermissionSection
                              eyebrow="Asignación"
                              title="Roles que puede asignar"
                              description="Al crear o editar usuarios, este rol podrá asignar estos roles."
                              permissions={partitioned.assign}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={toggleGroup}
                              onTogglePermission={togglePermission}
                            />
                            <PermissionSection
                              eyebrow="Alcance"
                              title="Alcance de carrera"
                              description="Define si puede elegir cualquier carrera o se fuerza su carrera."
                              permissions={partitioned.career}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={toggleGroup}
                              onTogglePermission={togglePermission}
                            />
                          </>
                        ) : (
                          <PermissionSection
                            eyebrow="CRUD"
                            title="Gestión"
                            description={`Permisos base de ${moduleLabel(moduleName).toLowerCase()}.`}
                            permissions={permissions}
                            isAllChecked={isAllChecked}
                            isIndeterminate={isIndeterminate}
                            checkedState={checkedState}
                            onToggleGroup={toggleGroup}
                            onTogglePermission={togglePermission}
                          />
                        )}
                      </div>
                    </section>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {errors?.permissions ? (
        <p className="text-sm text-destructive">{errors.permissions}</p>
      ) : null}
    </div>
  );
};
