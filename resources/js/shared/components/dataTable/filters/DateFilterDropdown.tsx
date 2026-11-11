import { useState } from "react";
import { format } from "date-fns";
import { es as dateFnsEs } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib";
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
  pickDate: "Elegir fecha",
  pickRange: "Elegir rango",
  apply: "Aplicar",
  reset: "Restablecer",
} as const;

const formatDisplayDate = (date: Date) =>
  format(date, "PPP", { locale: dateFnsEs });

export const DateFilterDropdown = ({
  config,
  appliedValue,
  onApply,
}: DateFilterDropdownProps) => {
  const presets = config?.presets ?? [];
  const modes = config?.modes?.length ? config.modes : DEFAULT_MODES;
  const defaultMode = config?.defaultMode ?? modes[0] ?? "single";
  const labels = { ...DEFAULT_LABELS, ...config?.labels };
  const numberOfMonths = config?.numberOfMonths ?? 2;
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
  const [singleOpen, setSingleOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);

  const hasPendingFilter =
    pendingPreset.trim() !== "" ||
    Boolean(singleDate) ||
    Boolean(dateRange?.from && dateRange?.to);

  const handlePresetChange = (preset: string) => {
    setPendingPreset(preset);
    setSingleDate(undefined);
    setDateRange(undefined);
    setSingleOpen(false);
    setRangeOpen(false);
  };

  const handlePickerModeChange = (mode: DateColumnFilterMode) => {
    if (!modes.includes(mode)) return;
    setPickerMode(mode);
    setPendingPreset("");
    setSingleOpen(false);
    setRangeOpen(false);
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
    if (date) setSingleOpen(false);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setPendingPreset("");
    setSingleDate(undefined);

    const previousRange = dateRange;
    setDateRange(range);

    if (!range?.from || !range.to) return;

    // DayPicker's first click sets `{ from, to }` to the same day; keep the
    // popover open until the user picks the end date (second click).
    const isFirstClick =
      !previousRange?.from &&
      !previousRange?.to &&
      range.from.getTime() === range.to.getTime();

    if (isFirstClick) return;

    setRangeOpen(false);
  };

  const handleReset = () => {
    setPendingPreset("");
    setSingleDate(undefined);
    setDateRange(undefined);
    setPickerMode(defaultMode);
    setSingleOpen(false);
    setRangeOpen(false);
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
      className="w-80 space-y-3 p-2"
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

          <div className="px-1.5">
            {pickerMode === "single" ? (
              <Popover
                modal={false}
                open={singleOpen}
                onOpenChange={setSingleOpen}
              >
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      data-empty={!singleDate}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !singleDate && "text-muted-foreground",
                      )}
                      aria-label={labels.pickDate}
                    />
                  }
                >
                  <CalendarIcon className="size-4" aria-hidden="true" />
                  {singleDate ? formatDisplayDate(singleDate) : labels.pickDate}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    locale={es}
                    selected={singleDate}
                    onSelect={handleSingleSelect}
                    captionLayout={captionLayout}
                    defaultMonth={singleDate}
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Popover modal={false} open={rangeOpen} onOpenChange={setRangeOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      data-empty={!dateRange?.from}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground",
                      )}
                      aria-label={labels.pickRange}
                    />
                  }
                >
                  <CalendarIcon className="size-4" aria-hidden="true" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {formatDisplayDate(dateRange.from)} -{" "}
                        {formatDisplayDate(dateRange.to)}
                      </>
                    ) : (
                      formatDisplayDate(dateRange.from)
                    )
                  ) : (
                    labels.pickRange
                  )}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="range"
                    locale={es}
                    selected={dateRange}
                    onSelect={handleRangeSelect}
                    captionLayout={captionLayout}
                    numberOfMonths={numberOfMonths}
                    defaultMonth={dateRange?.from}
                  />
                </PopoverContent>
              </Popover>
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
