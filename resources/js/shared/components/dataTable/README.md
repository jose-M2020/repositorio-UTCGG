# DataTable

Reusable table built on TanStack Table for rendering, sorting, filtering,
grouping, and paginating client-side data.

## When to use it

Use `DataTable` when the component receives the complete dataset to process
locally. If the API controls pagination and filters, use
[`ServerDataTable`](../serverDataTable/README.md).

## Basic usage

```tsx
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dataTable";

type User = {
  id: string;
  name: string;
  region: string;
};

const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "region",
    header: "Region",
  },
];

type UsersTableProps = {
  users: User[];
  loading?: boolean;
};

export const UsersTable = ({ users, loading = false }: UsersTableProps) => (
  <DataTable<User>
    columns={columns}
    data={users}
    loading={loading}
    emptyText="No users found"
    tableOptions={{ getRowId: (row) => row.id }}
  />
);
```

## Props

| Prop | Description |
| --- | --- |
| `columns` | TanStack Table column definitions. |
| `data` | Records processed by the table. |
| `loading` | Displays skeleton rows while data is loading. |
| `emptyText` | Message displayed when there are no rows. |
| `pagination` | Configures page sizes and visibility, or accepts `false` to hide it. |
| `toolbar` | Render prop that receives the table instance. |
| `renderSubComponent` | Optional content rendered below an expanded row. |
| `tableOptions` | Additional TanStack Table options, except `columns`, `data`, and `getCoreRowModel`. |

Pagination uses page sizes of `10`, `20`, and `50` by default and is hidden
when there is only one page.

## Expanding detail panels

Use row expanding to render custom detail content below a row.

```tsx
import { DataTable, createExpandColumn } from "@/components/dataTable";

const columns: ColumnDef<User, unknown>[] = [
  createExpandColumn<User>(),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
];

<DataTable<User>
  columns={columns}
  data={users}
  renderSubComponent={({ row }) => (
    <div className="bg-gray-50 p-4">
      <UserDetails user={row.original} />
    </div>
  )}
  tableOptions={{
    getRowId: (row) => row.id,
    getRowCanExpand: () => true,
    paginateExpandedRows: false,
  }}
/>;
```

Notes:

- Pass `renderSubComponent` at the table level; it receives the expanded `row`.
- Use `tableOptions.state.expanded` and `tableOptions.onExpandedChange` for controlled state.
- If expansion is handled by the backend, set `tableOptions.manualExpanding = true`.

## Column filters

Filters are configured through `column.meta.filter`. The column `id` must be
stable because it identifies the value in `columnFilters`.

### List

```tsx
const regionColumn: ColumnDef<User, unknown> = {
  id: "region",
  accessorKey: "region",
  header: "Region",
  enableColumnFilter: true,
  filterFn: (row, _columnId, values: string[]) =>
    values.includes(row.original.region),
  meta: {
    filter: {
      items: [
        { text: "North", value: "north" },
        { text: "South", value: "south" },
      ],
      multiple: true,
    },
  },
};
```

### Tree

Use `mode: "tree"` and add nested options through `children`.

```tsx
meta: {
  filter: {
    mode: "tree",
    multiple: true,
    treeDefaultExpanded: true,
    items: [
      {
        text: "In progress",
        value: "in-progress",
        children: [
          { text: "Documents", value: "documents" },
          { text: "Validation", value: "validation" },
        ],
      },
    ],
  },
}
```

### Search and options

When `search` and `items` are combined, the filter value has the shape
`{ search: string, values: string[] }`.

```tsx
meta: {
  filter: {
    search: {
      placeholder: "Search clients...",
      ariaLabel: "Search clients",
      clearAriaLabel: "Clear client search",
    },
    label: "Person type",
    items: [
      { text: "Individual", value: "FISICA" },
      { text: "Legal entity", value: "MORAL" },
    ],
    multiple: false,
  },
}
```

### Custom content

`dropdown` receives the table, column, and helpers for reading or updating the
selected values. `active` controls when the filter icon is highlighted.

```tsx
meta: {
  filter: {
    dropdown: ({ selectedValues, setFilterValue }) => (
      <CustomFilter
        values={selectedValues}
        onChange={setFilterValue}
      />
    ),
    active: ({ selectedValues }) => selectedValues.length > 0,
  },
}
```

## Global search

Render `DataTableGlobalSearch` from `toolbar`. Its state can be internal or
controlled through `tableOptions.state.globalFilter`.

```tsx
import {
  DataTable,
  DataTableGlobalSearch,
} from "@/components/dataTable";

<DataTable
  columns={columns}
  data={users}
  toolbar={(table) => (
    <DataTableGlobalSearch
      table={table}
      placeholder="Search users..."
    />
  )}
/>;
```

## Cell and group customization

`column.meta` accepts:

- `headerClassName`: classes applied to the header.
- `cellClassName`: classes applied to cells.
- `renderGroupHeader`: content rendered for a grouped row.

Configure all other capabilities through the TanStack Table API in `columns`
and `tableOptions`.
