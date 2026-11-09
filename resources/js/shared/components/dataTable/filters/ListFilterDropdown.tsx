import { useState } from "react";
import { Button, Checkbox, Separator } from "@/shared/components/ui";
import type { ColumnFilterItem } from "../types";

type ListFilterDropdownBaseProps = {
  items: ColumnFilterItem[];
  filterMultiple?: boolean;
  columnTitle: string;
};

type BatchListFilterDropdownProps = ListFilterDropdownBaseProps & {
  mode?: "batch";
  appliedValues: readonly string[];
  onApply: (values: string[]) => void;
  values?: never;
  onValuesChange?: never;
};

type DraftListFilterDropdownProps = ListFilterDropdownBaseProps & {
  mode: "draft";
  values: readonly string[];
  onValuesChange: (values: string[]) => void;
  appliedValues?: never;
  onApply?: never;
};

type ListFilterDropdownProps = BatchListFilterDropdownProps | DraftListFilterDropdownProps;

const toValueSet = (values: readonly string[]) => new Set(values);

export const ListFilterDropdown = (props: ListFilterDropdownProps) => {
  const { items, filterMultiple = false, columnTitle } = props;
  const isDraftMode = props.mode === "draft";

  // Batch mode keeps a local draft so Apply/Restablecer can defer the request.
  const [pendingValues, setPendingValues] = useState(() =>
    toValueSet(isDraftMode ? props.values : props.appliedValues),
  );

  const selectedValues = isDraftMode ? toValueSet(props.values) : pendingValues;
  const selectedCount = items.filter((item) => selectedValues.has(item.value)).length;
  const isSelectAllChecked = selectedCount > 0 && selectedCount === items.length;
  const isSelectAllIndeterminate = selectedCount > 0 && selectedCount < items.length;
  const radioGroupName = `list-filter-${columnTitle}`;

  const commitValues = (next: Set<string>) => {
    if (isDraftMode) {
      props.onValuesChange(Array.from(next));
      return;
    }
    setPendingValues(next);
  };

  const handleToggle = (value: string, checked: boolean) => {
    const next = filterMultiple
      ? (() => {
          const draft = new Set(selectedValues);
          if (checked) draft.add(value);
          else draft.delete(value);
          return draft;
        })()
      : checked
        ? new Set([value])
        : new Set<string>();

    commitValues(next);
  };

  const handleSelectAllChange = (checked: boolean) => {
    commitValues(checked ? new Set(items.map((item) => item.value)) : new Set<string>());
  };

  const handleReset = () => {
    if (isDraftMode) {
      props.onValuesChange([]);
      return;
    }

    setPendingValues(new Set());
    props.onApply([]);
  };

  const handleApply = () => {
    if (isDraftMode) return;
    props.onApply(Array.from(pendingValues));
  };

  return (
    <div
      className={isDraftMode ? "flex w-full flex-col" : "flex w-72 flex-col"}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {filterMultiple ? (
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Checkbox
            id={`list-filter-select-all-${columnTitle}`}
            checked={isSelectAllChecked}
            indeterminate={isSelectAllIndeterminate}
            onCheckedChange={(checked) => handleSelectAllChange(Boolean(checked))}
            aria-label="Seleccionar todo"
          />
          <label
            htmlFor={`list-filter-select-all-${columnTitle}`}
            className="cursor-pointer text-sm text-gray-700"
          >
            Seleccionar todo
          </label>
        </div>
      ) : null}

      <div className="max-h-64 overflow-y-auto px-3 pb-2">
        {items.map((item) => {
          const inputId = `list-filter-${columnTitle}-${item.value}`;
          const isChecked = selectedValues.has(item.value);

          return (
            <div
              key={item.value}
              className="flex items-center gap-2 rounded-sm py-1 hover:bg-gray-50"
            >
              {filterMultiple ? (
                <Checkbox
                  id={inputId}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleToggle(item.value, Boolean(checked))}
                  aria-label={item.text}
                />
              ) : (
                <input
                  id={inputId}
                  type="radio"
                  name={radioGroupName}
                  checked={isChecked}
                  onChange={() => handleToggle(item.value, true)}
                  className="size-4 shrink-0 accent-primary"
                  aria-label={item.text}
                />
              )}
              <label
                htmlFor={inputId}
                className="min-w-0 flex-1 cursor-pointer truncate text-sm text-gray-700"
              >
                {item.text}
              </label>
            </div>
          );
        })}
      </div>

      {!isDraftMode ? (
        <>
          <Separator />
          <div className="flex items-center justify-end gap-2 p-2">
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              Restablecer
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleApply}
              aria-label={`Aplicar filtro de ${columnTitle}`}
            >
              Aplicar
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
