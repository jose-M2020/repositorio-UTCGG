import { format, startOfDay } from "date-fns";
import type { DateRange, Matcher } from "react-day-picker";
import type {
  DateColumnFilterDisabledDates,
  DateColumnFilterMode,
  DateColumnFilterValue,
} from "../types";

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

const toCalendarDate = (value: string | Date): Date | undefined => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined;
    return startOfDay(value);
  }

  return parseDateFilterValue(value);
};

/** Build DayPicker `disabled` matchers from the shared date-filter config. */
export const resolveDisabledDateMatchers = (
  config: DateColumnFilterDisabledDates | undefined,
  now: Date = new Date(),
): Matcher[] => {
  if (!config) return [];

  const matchers: Matcher[] = [];
  const today = startOfDay(now);

  if (config.future) matchers.push({ after: today });
  if (config.past) matchers.push({ before: today });

  if (config.before) {
    const before = toCalendarDate(config.before);
    if (before) matchers.push({ before });
  }

  if (config.after) {
    const after = toCalendarDate(config.after);
    if (after) matchers.push({ after });
  }

  if (config.dates?.length) {
    const dates = config.dates
      .map((date) => toCalendarDate(date))
      .filter((date): date is Date => Boolean(date));
    if (dates.length === 1) matchers.push(dates[0]);
    if (dates.length > 1) matchers.push(dates);
  }

  if (config.range) {
    const from = toCalendarDate(config.range.from);
    const to = toCalendarDate(config.range.to);
    if (from && to) matchers.push({ from, to });
  }

  if (config.daysOfWeek?.length) {
    matchers.push({ dayOfWeek: [...config.daysOfWeek] });
  }

  if (config.match) matchers.push(config.match);

  return matchers;
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
