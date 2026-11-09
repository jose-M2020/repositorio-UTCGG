import { Search, X } from "lucide-react";
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { ColumnFilterItem, ColumnFilterSearchConfig, CompoundColumnFilterValue } from "../types";
import { ListFilterDropdown } from "./ListFilterDropdown";

type CompoundFilterDropdownProps = {
  search: ColumnFilterSearchConfig;
  items?: ColumnFilterItem[];
  label?: string;
  multiple?: boolean;
  value: CompoundColumnFilterValue;
  onChange: (value: CompoundColumnFilterValue) => void;
};

export const CompoundFilterDropdown = ({ search, items = [], label, multiple, value, onChange }: CompoundFilterDropdownProps) => {
  const hasActiveFilter = Boolean(value.search.trim()) || value.values.length > 0;

  return (
    <>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            type="text"
            placeholder={search.placeholder}
            value={value.search}
            onChange={(event) => onChange({ ...value, search: event.target.value })}
            onKeyDown={(event) => event.stopPropagation()}
            className="h-9 pl-9 pr-9"
            aria-label={search.ariaLabel}
          />
          {value.search.trim() ? (
            <button
              type="button"
              className="absolute right-2 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40"
              onClick={() => onChange({ ...value, search: "" })}
              aria-label={search.clearAriaLabel ?? `Limpiar ${search.ariaLabel.toLowerCase()}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {items.length > 0 ? (
        <>
          <DropdownMenuSeparator />
          {label ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
            </DropdownMenuGroup>
          ) : null}
          <ListFilterDropdown
            items={items}
            selectedValues={value.values}
            filterMultiple={multiple}
            columnTitle={label ?? search.ariaLabel}
            showClear={false}
            onChange={(values) => onChange({ ...value, values: values ?? [] })}
          />
        </>
      ) : null}

      {hasActiveFilter ? (
        <>
          <DropdownMenuSeparator />
          <div className="p-2">
            <Button type="button" size="sm" variant="outline" className="w-full" onClick={() => onChange({ search: "", values: [] })}>
              Limpiar
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};
