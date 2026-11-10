import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { DateColumnFilterMode, DateColumnFilterValue } from "../types";

export const EMPTY_DATE_COLUMN_FILTER_VALUE: DateColumnFilterValue = {
  preset: "",
  from: "",
  to: "",
};

export const formatDateFilterValue = (date: Date) => format(date, "yyyy-MM-dd");

export const parseDateFilterValue = (value: string): Date | undefined => {
  if (!value.trim()) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

export const isDateColumnFilterActive = (
  value: DateColumnFilterValue | null | undefined,
) => {
  if (!value) return false;
  const hasPreset = value.preset.trim() !== "";
  const hasRange = Boolean(value.from.trim()) && Boolean(value.to.trim());
  return hasPreset || hasRange;
};

export const parseDateColumnFilterValue = (
  value: unknown,
): DateColumnFilterValue => {
  if (typeof value !== "object" || value === null) {
    return { ...EMPTY_DATE_COLUMN_FILTER_VALUE };
  }

  const record = value as Record<string, unknown>;
  return {
    preset: typeof record.preset === "string" ? record.preset : "",
    from: typeof record.from === "string" ? record.from : "",
    to: typeof record.to === "string" ? record.to : "",
  };
};

export const resolveDatePickerMode = (
  value: DateColumnFilterValue,
  modes: readonly DateColumnFilterMode[],
  defaultMode: DateColumnFilterMode,
): DateColumnFilterMode => {
  if (value.from && value.to && value.from !== value.to && modes.includes("range")) {
    return "range";
  }

  if (modes.includes(defaultMode)) return defaultMode;
  return modes[0] ?? "single";
};

export const toSingleDateSelection = (
  value: DateColumnFilterValue,
): Date | undefined => {
  if (value.from && value.to && value.from === value.to) {
    return parseDateFilterValue(value.from);
  }
  if (value.from && !value.to) return parseDateFilterValue(value.from);
  return undefined;
};

export const toRangeDateSelection = (
  value: DateColumnFilterValue,
): DateRange | undefined => {
  const from = parseDateFilterValue(value.from);
  const to = parseDateFilterValue(value.to);
  if (!from && !to) return undefined;
  return { from, to };
};
