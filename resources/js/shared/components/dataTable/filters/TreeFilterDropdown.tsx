import { useState } from "react";
import { Button, Checkbox, Separator } from "@/shared/components/ui";
import type { ColumnFilterItem } from "../types";
import { TreeFilterNode } from "./TreeFilterNode";
import { collectLeafValues, expandAppliedValues, getNodeCheckState, TREE_FILTER_CHECK_STATE, type TreeFilterCheckState } from "./treeFilterUtils";

type TreeFilterDropdownProps = {
  filters: readonly ColumnFilterItem[];
  appliedValues: readonly string[];
  defaultExpanded?: boolean;
  filterMultiple?: boolean;
  onApply: (values: string[]) => void;
};

const checkboxValue = (state: TreeFilterCheckState): boolean => state === TREE_FILTER_CHECK_STATE.indeterminate ? false : state === TREE_FILTER_CHECK_STATE.checked;

export const TreeFilterDropdown = ({ filters, appliedValues, defaultExpanded = true, filterMultiple = true, onApply }: TreeFilterDropdownProps) => {
  const groupKeys = filters.flatMap(function collectGroupKeys(node): string[] {
    return node.children?.length ? [node.value, ...node.children.flatMap(collectGroupKeys)] : [];
  });
  const allLeaves = filters.flatMap(collectLeafValues);
  // This draft is deliberately local UI state so Apply/Reset can be deferred; applied filters remain TanStack column state.
  const [pendingLeaves, setPendingLeaves] = useState(() => expandAppliedValues(appliedValues, filters));
  const [expandedKeys, setExpandedKeys] = useState(() => new Set(defaultExpanded ? groupKeys : []));
  const selectedCount = allLeaves.filter((leaf) => pendingLeaves.has(leaf)).length;
  const selectAllState = selectedCount === 0 ? TREE_FILTER_CHECK_STATE.unchecked : selectedCount === allLeaves.length ? TREE_FILTER_CHECK_STATE.checked : TREE_FILTER_CHECK_STATE.indeterminate;

  const toggleLeaf = (value: string, checked: boolean) => {
    setPendingLeaves((previous) => {
      if (!filterMultiple) return checked ? new Set([value]) : new Set<string>();
      const next = new Set(previous);
      if (checked) next.add(value); else next.delete(value);
      return next;
    });
  };
  const toggleGroup = (node: ColumnFilterItem, checked: boolean) => {
    if (!filterMultiple) return;
    setPendingLeaves((previous) => {
      const next = new Set(previous);
      collectLeafValues(node).forEach((leaf) => checked ? next.add(leaf) : next.delete(leaf));
      return next;
    });
  };

  return (
    <div className="flex w-72 flex-col" onPointerDown={(event) => event.stopPropagation()}>
      {filterMultiple ? (
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Checkbox
            id="tree-filter-select-all"
            checked={checkboxValue(selectAllState)}
            onCheckedChange={(checked) => {
              setPendingLeaves(checked ? new Set(allLeaves) : new Set<string>());
            }}
            aria-label="Seleccionar todo"  
          />
          <label htmlFor="tree-filter-select-all" className="cursor-pointer text-sm text-gray-700">Seleccionar todo</label>
        </div>
      ) : null}
      <div className="max-h-64 overflow-y-auto px-3 pb-2">
        {filters.map((node) => (
          <TreeFilterNode
            key={node.value}
            node={node}
            filterMultiple={filterMultiple}
            isExpanded={(key) => expandedKeys.has(key)}
            getCheckState={(filterNode) => getNodeCheckState(filterNode, pendingLeaves)}
            onToggleExpand={(key) => setExpandedKeys((previous) => {
              const next = new Set(previous);
              if (next.has(key)) next.delete(key); else next.add(key);
              return next;
            })}
            onToggleGroup={toggleGroup}
            onToggleLeaf={toggleLeaf}
          />
        ))}
      </div>
      <Separator />
      <div className="flex items-center justify-end gap-2 p-2">
        <Button type="button" variant="outline" size="sm" onClick={() => {
          setPendingLeaves(new Set());
          setExpandedKeys(new Set(defaultExpanded ? groupKeys : []));
        }}>Restablecer</Button>
        <Button type="button" size="sm" onClick={() => onApply(Array.from(pendingLeaves))}>Aplicar</Button>
      </div>
    </div>
  );
};
