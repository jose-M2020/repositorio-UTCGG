import { useState } from "react";
import { Search, X } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import type {
  ColumnFilterItem,
  ColumnFilterSearchConfig,
  CompoundColumnFilterValue,
} from "../types";
import { ListFilterDropdown } from "./ListFilterDropdown";

type CompoundFilterDropdownProps = {
  search: ColumnFilterSearchConfig;
  items?: ColumnFilterItem[];
  label?: string;
  multiple?: boolean;
  value: CompoundColumnFilterValue;
  onApply: (value: CompoundColumnFilterValue) => void;
};

export const CompoundFilterDropdown = ({
  search,
  items = [],
  label,
  multiple,
  value,
  onApply,
}: CompoundFilterDropdownProps) => {
  // Draft stays local so Apply/Restablecer can defer the request.
  const [pendingSearch, setPendingSearch] = useState(value.search);
  const [pendingValues, setPendingValues] = useState(value.values);
  const hasPendingFilter = Boolean(pendingSearch.trim()) || pendingValues.length > 0;

  const handleReset = () => {
    setPendingSearch("");
    setPendingValues([]);
    onApply({ search: "", values: [] });
  };

  const handleApply = () => {
    onApply({
      search: pendingSearch,
      values: pendingValues,
    });
  };

  return (
    <div className="flex w-72 flex-col" onPointerDown={(event) => event.stopPropagation()}>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            type="text"
            placeholder={search.placeholder}
            value={pendingSearch}
            onChange={(event) => setPendingSearch(event.target.value)}
            onKeyDown={(event) => event.stopPropagation()}
            className="h-9 pr-9 pl-9"
            aria-label={search.ariaLabel}
          />
          {pendingSearch.trim() ? (
            <button
              type="button"
              className="absolute top-1.5 right-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
              onClick={() => setPendingSearch("")}
              aria-label={
                search.clearAriaLabel ?? `Limpiar ${search.ariaLabel.toLowerCase()}`
              }
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
            mode="draft"
            items={items}
            values={pendingValues}
            filterMultiple={multiple}
            columnTitle={label ?? search.ariaLabel}
            onValuesChange={setPendingValues}
          />
        </>
      ) : null}

      <Separator />
      <div className="flex items-center justify-end gap-2 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!hasPendingFilter}
        >
          Restablecer
        </Button>
        <Button type="button" size="sm" onClick={handleApply}>
          Aplicar
        </Button>
      </div>
    </div>
  );
};
