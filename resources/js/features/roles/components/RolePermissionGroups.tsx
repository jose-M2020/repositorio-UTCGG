import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "cn";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui";
import type { PermissionGroups, RoleFormErrors, RolePermission } from "../types";
import {
  moduleLabel,
  partitionPermissions,
  permissionLabel,
} from "../utils/permissionDisplay";

type RolePermissionGroupsProps = {
  permissionGroups: PermissionGroups;
  selected?: string[];
  errors?: RoleFormErrors;
};

const moduleSectionId = (moduleName: string): string =>
  `permission-module-${moduleName}`;

const matchesSearch = (
  permission: RolePermission,
  query: string,
): boolean => {
  if (query === "") {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  const label = permissionLabel(permission).toLowerCase();

  return (
    label.includes(normalizedQuery) ||
    permission.name.toLowerCase().includes(normalizedQuery)
  );
};

export const RolePermissionGroups = ({
  permissionGroups,
  selected = [],
  errors,
}: RolePermissionGroupsProps) => {
  const groups = Object.entries(permissionGroups);
  const [checkedState, setCheckedState] = useState<Set<string>>(
    () => new Set(selected),
  );
  const [activeModule, setActiveModule] = useState<string>(
    () => groups[0]?.[0] ?? "",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingToModuleRef = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const moduleNames = Object.keys(permissionGroups);
    if (!container || moduleNames.length === 0) {
      return;
    }

    const sectionElements = moduleNames
      .map((moduleName) =>
        container.querySelector(`#${CSS.escape(moduleSectionId(moduleName))}`),
      )
      .filter((element): element is Element => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToModuleRef.current) {
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        const topVisible = visible[0]?.target.getAttribute("data-module");
        if (topVisible) {
          setActiveModule(topVisible);
        }
      },
      {
        root: container,
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [permissionGroups, searchQuery]);

  if (groups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay permisos registrados.
      </p>
    );
  }

  const handleTogglePermission = (name: string, checked: boolean) => {
    const next = new Set(checkedState);
    if (checked) {
      next.add(name);
    } else {
      next.delete(name);
    }
    setCheckedState(next);
  };

  const handleToggleGroup = (permissions: RolePermission[]) => {
    const names = permissions.map((permission) => permission.name);
    const allChecked = names.every((name) => checkedState.has(name));
    const next = new Set(checkedState);

    if (allChecked) {
      names.forEach((name) => next.delete(name));
    } else {
      names.forEach((name) => next.add(name));
    }

    setCheckedState(next);
  };

  const isAllChecked = (permissions: RolePermission[]): boolean =>
    permissions.length > 0 &&
    permissions.every((permission) => checkedState.has(permission.name));

  const isIndeterminate = (permissions: RolePermission[]): boolean =>
    permissions.some((permission) => checkedState.has(permission.name)) &&
    !isAllChecked(permissions);

  const handleNavigateToModule = (moduleName: string) => {
    setActiveModule(moduleName);
    const container = scrollContainerRef.current;
    const section = container?.querySelector(
      `#${CSS.escape(moduleSectionId(moduleName))}`,
    );

    if (!container || !(section instanceof HTMLElement)) {
      return;
    }

    isScrollingToModuleRef.current = true;
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      isScrollingToModuleRef.current = false;
    }, 450);
  };

  const normalizedQuery = searchQuery.trim();
  const visibleGroups = groups
    .map(([moduleName, permissions]) => {
      const filteredPermissions = permissions.filter((permission) =>
        matchesSearch(permission, normalizedQuery),
      );

      return [moduleName, filteredPermissions] as const;
    })
    .filter(([, permissions]) => permissions.length > 0);

  const selectedCount = checkedState.size;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Permisos</p>
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
                  onClick={() => handleNavigateToModule(moduleName)}
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
                      <header className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Módulo
                          </p>
                          <h3 className="truncate text-base font-semibold text-foreground">
                            {moduleLabel(moduleName)}
                          </h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground tabular-nums ring-1 ring-border">
                          {selectedInModule}/{permissions.length}
                        </span>
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
                              onToggleGroup={handleToggleGroup}
                              onTogglePermission={handleTogglePermission}
                            />
                            <PermissionSection
                              eyebrow="Operaciones"
                              title="Acciones específicas"
                              description="Operaciones puntuales aparte del CRUD (activar, cambiar rol, enviar enlace, etc.)."
                              permissions={partitioned.actions}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={handleToggleGroup}
                              onTogglePermission={handleTogglePermission}
                            />
                            <PermissionSection
                              eyebrow="Asignación"
                              title="Roles que puede asignar"
                              description="Al crear o editar usuarios, este rol podrá asignar estos roles."
                              permissions={partitioned.assign}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={handleToggleGroup}
                              onTogglePermission={handleTogglePermission}
                            />
                            <PermissionSection
                              eyebrow="Alcance"
                              title="Alcance de carrera"
                              description="Define si puede elegir cualquier carrera o se fuerza su carrera."
                              permissions={partitioned.career}
                              isAllChecked={isAllChecked}
                              isIndeterminate={isIndeterminate}
                              checkedState={checkedState}
                              onToggleGroup={handleToggleGroup}
                              onTogglePermission={handleTogglePermission}
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
                            onToggleGroup={handleToggleGroup}
                            onTogglePermission={handleTogglePermission}
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

const PermissionSection = ({
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
