import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import type { ColumnFilterItem } from "../types";

type ListFilterDropdownProps = {
  items: ColumnFilterItem[];
  selectedValues: readonly string[];
  filterMultiple?: boolean;
  columnTitle: string;
  showClear?: boolean;
  onChange: (values: string[] | null) => void;
};

export const ListFilterDropdown = ({ items, selectedValues, filterMultiple = false, columnTitle, showClear = true, onChange }: ListFilterDropdownProps) => {
  const handleValueChange = (value: string, checked: boolean) => {
    if (!filterMultiple) {
      onChange(checked ? [value] : null);
      return;
    }

    const values = checked
      ? Array.from(new Set([...selectedValues, value]))
      : selectedValues.filter((selectedValue) => selectedValue !== value);
    onChange(values.length ? values : null);
  };

  if (!filterMultiple) {
    return (
      <DropdownMenuRadioGroup value={selectedValues[0] ?? "ALL"} onValueChange={(value) => onChange(value === "ALL" ? null : [value])}>
        <DropdownMenuRadioItem value="ALL">Todas</DropdownMenuRadioItem>
        {items.map((item) => <DropdownMenuRadioItem key={item.value} value={item.value}>{item.text}</DropdownMenuRadioItem>)}
      </DropdownMenuRadioGroup>
    );
  }

  return (
    <div className="py-1">
      {items.map((item) => (
        <DropdownMenuCheckboxItem key={item.value} checked={selectedValues.includes(item.value)} onSelect={(event) => event.preventDefault()} onCheckedChange={(checked) => handleValueChange(item.value, checked)} className="cursor-pointer">
          {item.text}
        </DropdownMenuCheckboxItem>
      ))}
      {showClear && selectedValues.length > 0 ? (
        <>
          <DropdownMenuSeparator />
          <div className="p-2">
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => onChange(null)} aria-label={`Limpiar filtro de ${columnTitle}`}>
                Limpiar filtro
              </Button>
            </DropdownMenuItem>
          </div>
        </>
      ) : null}
    </div>
  );
};
