import type { ColumnFilterItem } from "../types";

export const TREE_FILTER_CHECK_STATE = {
  checked: "checked",
  unchecked: "unchecked",
  indeterminate: "indeterminate",
} as const;

export type TreeFilterCheckState = (typeof TREE_FILTER_CHECK_STATE)[keyof typeof TREE_FILTER_CHECK_STATE];

export const isGroupNode = (node: ColumnFilterItem): boolean => Boolean(node.children?.length);

export const flattenFilterItems = (items: readonly ColumnFilterItem[]): ColumnFilterItem[] =>
  items.flatMap((item) => [{ text: item.text, value: item.value }, ...flattenFilterItems(item.children ?? [])]);

export const collectLeafValues = (node: ColumnFilterItem): string[] =>
  node.children?.length ? node.children.flatMap(collectLeafValues) : [node.value];

export const getNodeCheckState = (node: ColumnFilterItem, selectedLeaves: ReadonlySet<string>): TreeFilterCheckState => {
  const leaves = collectLeafValues(node);
  const selectedCount = leaves.filter((leaf) => selectedLeaves.has(leaf)).length;
  if (selectedCount === 0) return TREE_FILTER_CHECK_STATE.unchecked;
  return selectedCount === leaves.length ? TREE_FILTER_CHECK_STATE.checked : TREE_FILTER_CHECK_STATE.indeterminate;
};

export const expandAppliedValues = (appliedValues: readonly string[], tree: readonly ColumnFilterItem[]): Set<string> => {
  const nodesByValue = new Map<string, ColumnFilterItem>();
  const visit = (nodes: readonly ColumnFilterItem[]) => nodes.forEach((node) => {
    nodesByValue.set(node.value, node);
    visit(node.children ?? []);
  });
  visit(tree);

  return new Set(appliedValues.flatMap((value) => {
    const node = nodesByValue.get(value);
    return node && isGroupNode(node) ? collectLeafValues(node) : value;
  }));
};
