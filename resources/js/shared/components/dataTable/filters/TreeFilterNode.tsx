import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/lib";
import type { ColumnFilterItem } from "../types";
import { isGroupNode, TREE_FILTER_CHECK_STATE, type TreeFilterCheckState } from "./treeFilterUtils";

type TreeFilterNodeProps = {
  node: ColumnFilterItem;
  depth?: number;
  filterMultiple: boolean;
  isExpanded: (key: string) => boolean;
  getCheckState: (node: ColumnFilterItem) => TreeFilterCheckState;
  onToggleExpand: (key: string) => void;
  onToggleGroup: (node: ColumnFilterItem, checked: boolean) => void;
  onToggleLeaf: (value: string, checked: boolean) => void;
};

export const TreeFilterNode = ({
  node,
  depth = 0,
  filterMultiple,
  isExpanded,
  getCheckState,
  onToggleExpand,
  onToggleGroup,
  onToggleLeaf,
}: TreeFilterNodeProps) => {
  const hasChildren = isGroupNode(node);
  const checkState = getCheckState(node);
  const expanded = hasChildren && isExpanded(node.value);
  const isChecked = checkState === TREE_FILTER_CHECK_STATE.checked;
  const isIndeterminate = checkState === TREE_FILTER_CHECK_STATE.indeterminate;
  const inputId = `tree-filter-${node.value}`;

  return (
    <div>
      <div
        className="flex items-center gap-1.5 rounded-sm py-1 pr-2 hover:bg-gray-50"
        style={{ paddingLeft: depth * 16 }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            onClick={() => onToggleExpand(node.value)}
            aria-label={expanded ? `Contraer ${node.text}` : `Expandir ${node.text}`}
            aria-expanded={expanded}
          >
            {expanded ? (
              <ChevronDown className="size-3.5" aria-hidden="true" />
            ) : (
              <ChevronRight className="size-3.5" aria-hidden="true" />
            )}
          </button>
        ) : (
          <span className="inline-block size-5 shrink-0" aria-hidden="true" />
        )}

        {hasChildren && !filterMultiple ? (
          <span className="inline-block size-4 shrink-0" aria-hidden="true" />
        ) : !filterMultiple ? (
          <input
            id={inputId}
            type="radio"
            name="tree-filter-selection"
            checked={isChecked}
            onChange={() => onToggleLeaf(node.value, true)}
            className="size-4 shrink-0 accent-primary"
            aria-label={node.text}
          />
        ) : (
          <Checkbox
            id={inputId}
            checked={isChecked}
            indeterminate={isIndeterminate}
            onCheckedChange={(checked) => {
              if (hasChildren) onToggleGroup(node, Boolean(checked));
              else onToggleLeaf(node.value, Boolean(checked));
            }}
            aria-label={node.text}
          />
        )}

        <label
          htmlFor={inputId}
          className={cn("min-w-0 flex-1 cursor-pointer truncate text-sm text-gray-700")}
        >
          {node.text}
        </label>
      </div>

      {hasChildren && expanded
        ? node.children?.map((child) => (
            <TreeFilterNode
              key={child.value}
              node={child}
              depth={depth + 1}
              filterMultiple={filterMultiple}
              isExpanded={isExpanded}
              getCheckState={getCheckState}
              onToggleExpand={onToggleExpand}
              onToggleGroup={onToggleGroup}
              onToggleLeaf={onToggleLeaf}
            />
          ))
        : null}
    </div>
  );
};
