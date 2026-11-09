import { Button, Input } from "@/shared/components/ui";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";

export type UsersDateFilterValue = {
  fecha: string;
  rango_fecha: string[];
};

type UsersDateFilterProps = {
  value: UsersDateFilterValue;
  onChange: (value: UsersDateFilterValue | null) => void;
};

const datePresets = [
  { value: "hoy", label: "Hoy" },
  { value: "semana", label: "Esta Semana" },
  { value: "mes", label: "Este mes" },
  { value: "año", label: "Este año" },
] as const;

export const isUsersDateFilterActive = (value: UsersDateFilterValue | null | undefined) => {
  if (!value) return false;
  const hasPreset = value.fecha.trim() !== "";
  const hasRange = Boolean(value.rango_fecha[0]?.trim()) && Boolean(value.rango_fecha[1]?.trim());
  return hasPreset || hasRange;
};

export const UsersDateFilter = ({ value, onChange }: UsersDateFilterProps) => {
  const handlePresetChange = (fecha: string) => {
    onChange({
      fecha,
      rango_fecha: ["", ""],
    });
  };

  const handleRangeChange = (index: 0 | 1, nextValue: string) => {
    const rango_fecha = [...(value.rango_fecha.length === 2 ? value.rango_fecha : ["", ""])] as string[];
    rango_fecha[index] = nextValue;
    onChange({
      fecha: "",
      rango_fecha,
    });
  };

  return (
    <div className="w-72 space-y-2 p-2" onPointerDown={(event) => event.stopPropagation()}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Por fecha</DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuRadioGroup value={value.fecha || "NONE"} onValueChange={(next) => handlePresetChange(next === "NONE" ? "" : next)}>
        <DropdownMenuRadioItem value="NONE">Sin preset</DropdownMenuRadioItem>
        {datePresets.map((preset) => (
          <DropdownMenuRadioItem key={preset.value} value={preset.value}>
            {preset.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>

      <DropdownMenuSeparator />
      <p className="px-1.5 text-xs text-muted-foreground">Establecer rango</p>
      <div className="flex items-center gap-2 px-1.5">
        <Input
          type="date"
          value={value.rango_fecha[0] ?? ""}
          onChange={(event) => handleRangeChange(0, event.target.value)}
          aria-label="Fecha inicial"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="date"
          value={value.rango_fecha[1] ?? ""}
          onChange={(event) => handleRangeChange(1, event.target.value)}
          aria-label="Fecha final"
        />
      </div>

      {isUsersDateFilterActive(value) ? (
        <>
          <DropdownMenuSeparator />
          <Button type="button" size="sm" variant="outline" className="w-full" onClick={() => onChange(null)}>
            Limpiar
          </Button>
        </>
      ) : null}
    </div>
  );
};
