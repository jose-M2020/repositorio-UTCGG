import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import type {
  ColumnFilterDateConfig,
  DateColumnFilterMode,
  DateColumnFilterValue,
} from "../types";
import {
  EMPTY_DATE_COLUMN_FILTER_VALUE,
  formatDateFilterValue,
  isDateColumnFilterActive,
  resolveDatePickerMode,
  toRangeDateSelection,
  toSingleDateSelection,
} from "./dateFilterUtils";

type DateFilterDropdownProps = {
  config?: ColumnFilterDateConfig;
  appliedValue: DateColumnFilterValue;
  onApply: (value: DateColumnFilterValue | null) => void;
};

const DEFAULT_MODES: readonly DateColumnFilterMode[] = ["single", "range"];

const DEFAULT_LABELS = {
  title: "Por fecha",
  calendar: "Seleccionar en calendario",
  single: "Día",
  range: "Rango",
  noPreset: "Sin preset",
  apply: "Aplicar",
  reset: "Restablecer",
} as const;

export const DateFilterDropdown = ({
  config,
  appliedValue,
  onApply,
}: DateFilterDropdownProps) => {
  const presets = config?.presets ?? [];
  const modes = config?.modes?.length ? config.modes : DEFAULT_MODES;
  const defaultMode = config?.defaultMode ?? modes[0] ?? "single";
  const labels = { ...DEFAULT_LABELS, ...config?.labels };
  const numberOfMonths = config?.numberOfMonths ?? 1;
  const captionLayout = config?.captionLayout ?? "dropdown";
  const showModeToggle = modes.length > 1;

  // Draft stays local so Aplicar/Restablecer can defer the request.
  const [pendingPreset, setPendingPreset] = useState(appliedValue.preset);
  const [pickerMode, setPickerMode] = useState<DateColumnFilterMode>(() =>
    resolveDatePickerMode(appliedValue, modes, defaultMode),
  );
  const [singleDate, setSingleDate] = useState<Date | undefined>(() =>
    toSingleDateSelection(appliedValue),
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() =>
    toRangeDateSelection(appliedValue),
  );

  const hasPendingFilter =
    pendingPreset.trim() !== "" ||
    Boolean(singleDate) ||
    Boolean(dateRange?.from && dateRange?.to);

  const handlePresetChange = (preset: string) => {
    setPendingPreset(preset);
    setSingleDate(undefined);
    setDateRange(undefined);
  };

  const handlePickerModeChange = (mode: DateColumnFilterMode) => {
    if (!modes.includes(mode)) return;
    setPickerMode(mode);
    setPendingPreset("");
    if (mode === "single") {
      setDateRange(undefined);
      return;
    }
    setSingleDate(undefined);
  };

  const handleSingleSelect = (date: Date | undefined) => {
    setPendingPreset("");
    setSingleDate(date);
    setDateRange(undefined);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setPendingPreset("");
    setSingleDate(undefined);
    setDateRange(range);
  };

  const handleReset = () => {
    setPendingPreset("");
    setSingleDate(undefined);
    setDateRange(undefined);
    setPickerMode(defaultMode);
    onApply(null);
  };

  const handleApply = () => {
    if (pendingPreset.trim()) {
      onApply({
        ...EMPTY_DATE_COLUMN_FILTER_VALUE,
        preset: pendingPreset,
      });
      return;
    }

    if (pickerMode === "single" && singleDate) {
      const formatted = formatDateFilterValue(singleDate);
      onApply({
        preset: "",
        from: formatted,
        to: formatted,
      });
      return;
    }

    if (pickerMode === "range" && dateRange?.from && dateRange?.to) {
      onApply({
        preset: "",
        from: formatDateFilterValue(dateRange.from),
        to: formatDateFilterValue(dateRange.to),
      });
      return;
    }

    onApply(null);
  };

  return (
    <div
      className="w-fit space-y-3 p-2"
      onPointerDown={(event) => event.stopPropagation()}
    >
      {presets.length > 0 ? (
        <>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{labels.title}</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={pendingPreset || "NONE"}
            onValueChange={(next) =>
              handlePresetChange(next === "NONE" ? "" : next)
            }
          >
            <DropdownMenuRadioItem value="NONE">
              {labels.noPreset}
            </DropdownMenuRadioItem>
            {presets.map((preset) => (
              <DropdownMenuRadioItem key={preset.value} value={preset.value}>
                {preset.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
        </>
      ) : null}

      {modes.length > 0 ? (
        <>
          <p className="px-1.5 text-xs text-muted-foreground">{labels.calendar}</p>
          {showModeToggle ? (
            <div className="flex gap-2 px-1.5">
              {modes.includes("single") ? (
                <Button
                  type="button"
                  size="sm"
                  variant={pickerMode === "single" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handlePickerModeChange("single")}
                  aria-pressed={pickerMode === "single"}
                >
                  {labels.single}
                </Button>
              ) : null}
              {modes.includes("range") ? (
                <Button
                  type="button"
                  size="sm"
                  variant={pickerMode === "range" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handlePickerModeChange("range")}
                  aria-pressed={pickerMode === "range"}
                >
                  {labels.range}
                </Button>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-lg border bg-background p-1">
            {pickerMode === "single" ? (
              <Calendar
                mode="single"
                locale={es}
                selected={singleDate}
                onSelect={handleSingleSelect}
                captionLayout={captionLayout}
              />
            ) : (
              <Calendar
                mode="range"
                locale={es}
                selected={dateRange}
                onSelect={handleRangeSelect}
                captionLayout={captionLayout}
                numberOfMonths={numberOfMonths}
              />
            )}
          </div>
          <DropdownMenuSeparator />
        </>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!hasPendingFilter && !isDateColumnFilterActive(appliedValue)}
        >
          {labels.reset}
        </Button>
        <Button type="button" size="sm" onClick={handleApply}>
          {labels.apply}
        </Button>
      </div>
    </div>
  );
};
