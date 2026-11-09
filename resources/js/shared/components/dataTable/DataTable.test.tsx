import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./index";
import { createExpandColumn } from "./createExpandColumn";

type Row = {
  id: string;
  name: string;
  region: string;
};

const sampleRows: Row[] = [
  { id: "1", name: "Ana", region: "norte" },
  { id: "2", name: "Bruno", region: "sur" },
  { id: "3", name: "Carmen", region: "norte" },
];

const nameColumn = (): ColumnDef<Row, unknown> => ({ id: "name", accessorKey: "name", header: "Nombre" });

const regionFilterColumn = (): ColumnDef<Row, unknown> => ({
  id: "region",
  accessorKey: "region",
  header: "Región",
  enableColumnFilter: true,
  filterFn: (row, _columnId, filterValue: string[]) => filterValue.includes(row.original.region),
  meta: {
    filter: {
      multiple: false,
      items: [
        { text: "Norte", value: "norte" },
        { text: "Sur", value: "sur" },
      ],
    },
  },
});

describe("DataTable", () => {
  describe("when there is no data and the table is not loading", () => {
    it("should show the custom empty message", () => {
      // Given
      render(<DataTable<Row> columns={[nameColumn()]} data={[]} emptyText="Sin filas de prueba" pagination={false} />);

      // Then
      expect(screen.getByText("Sin filas de prueba")).toBeInTheDocument();
    });
  });

  describe("when data is loading and there are no rows yet", () => {
    it("should render skeleton rows inside the table", () => {
      // Given
      render(<DataTable<Row> columns={[nameColumn()]} data={[]} loading pagination={false} />);

      // Then
      expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
    });
  });

  describe("when the table has basic columns and rows", () => {
    it("should render headers and cell values", () => {
      // Given
      render(<DataTable<Row> columns={[nameColumn(), { id: "region", accessorKey: "region", header: "Región" }]} data={sampleRows} pagination={false} />);

      // Then
      expect(screen.getByRole("columnheader", { name: /nombre/i })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: /región/i })).toBeInTheDocument();
      expect(screen.getByText("Ana")).toBeInTheDocument();
    });
  });

  describe("when there are more rows than the client page size", () => {
    it("should use TanStack pagination to advance rows", async () => {
      // Given
      const user = userEvent.setup();
      const rows = Array.from({ length: 15 }, (_, index) => ({ id: String(index + 1), name: `Usuario ${index + 1}`, region: "norte" }));
      render(<DataTable<Row> columns={[nameColumn()]} data={rows} pagination={{ pageSizeOptions: [10, 20], hideOnSinglePage: false }} tableOptions={{ initialState: { pagination: { pageSize: 10 } } }} />);

      // When
      await user.click(screen.getByRole("button", { name: /página siguiente/i }));

      // Then
      expect(await screen.findByText("Usuario 11")).toBeInTheDocument();
    });
  });

  describe("when a column supports sorting", () => {
    it("should use the column sorting definition", async () => {
      // Given
      const user = userEvent.setup();
      render(<DataTable<Row> columns={[{ ...nameColumn(), enableSorting: true }]} data={[{ id: "1", name: "Zeta", region: "x" }, { id: "2", name: "Alpha", region: "x" }]} pagination={false} />);
      const bodyRows = () => screen.getAllByRole("row").filter((row) => row.querySelector("td"));

      // When
      await user.click(screen.getByRole("button", { name: /ordenar/i }));

      // Then
      expect(within(bodyRows()[0]).getByText("Alpha")).toBeInTheDocument();
    });
  });

  describe("when a column has a filter", () => {
    it("should use TanStack column filter state to hide non-matching rows", async () => {
      // Given
      const user = userEvent.setup();
      render(<DataTable<Row> columns={[nameColumn(), regionFilterColumn()]} data={sampleRows} pagination={false} />);

      // When
      await user.click(screen.getByRole("button", { name: /filtrar región/i }));
      await user.click(await screen.findByRole("menuitemradio", { name: /^sur$/i }));

      // Then
      expect(screen.getByText("Bruno")).toBeInTheDocument();
      expect(screen.queryByText("Ana")).not.toBeInTheDocument();
    });
  });

  describe("when a column provides a custom filter dropdown", () => {
    it("should provide the TanStack table and column instances to the dropdown", async () => {
      // Given
      const user = userEvent.setup();
      const renderDropdown = vi.fn(() => <span>Filtro personalizado</span>);
      render(
        <DataTable<Row>
          columns={[
            {
              ...nameColumn(),
              meta: { filter: { dropdown: renderDropdown } },
            },
          ]}
          data={sampleRows}
          pagination={false}
        />,
      );

      // When
      await user.click(screen.getByRole("button", { name: /filtrar nombre/i }));

      // Then
      expect(screen.getByText("Filtro personalizado")).toBeInTheDocument();
      expect(renderDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          column: expect.objectContaining({ id: "name" }),
          table: expect.objectContaining({ setGlobalFilter: expect.any(Function) }),
        }),
      );
    });
  });

  describe("when pagination is controlled by the server", () => {
    it("should forward TanStack's updater to the supplied callback", async () => {
      // Given
      const user = userEvent.setup();
      const onPaginationChange = vi.fn();
      const pagination: PaginationState = { pageIndex: 0, pageSize: 10 };
      render(<DataTable<Row> columns={[nameColumn()]} data={[sampleRows[0]]} pagination={{ pageSizeOptions: [10, 20], hideOnSinglePage: false }} tableOptions={{ state: { pagination }, onPaginationChange, manualPagination: true, pageCount: 3, rowCount: 30 }} />);

      // When
      await user.click(screen.getByRole("button", { name: /página siguiente/i }));

      // Then
      expect(onPaginationChange).toHaveBeenCalled();
      expect(onPaginationChange.mock.calls[0][0](pagination)).toEqual({ pageIndex: 1, pageSize: 10 });
    });
  });

  describe("when rows are grouped", () => {
    it("should render the group header through the grouped row model", () => {
      // Given
      render(<DataTable<Row> columns={[{ id: "region", accessorKey: "region", header: "", enableGrouping: true, meta: { renderGroupHeader: ({ groupKey }) => <span>Grupo {groupKey}</span> } }, nameColumn()]} data={sampleRows} pagination={false} tableOptions={{ initialState: { grouping: ["region"], expanded: true, columnVisibility: { region: false } } }} />);

      // Then
      expect(screen.getByText("Grupo norte")).toBeInTheDocument();
      expect(screen.getByText("Grupo sur")).toBeInTheDocument();
    });
  });

  describe("when rows support detail-panel expanding", () => {
    it("should toggle the expanded detail row when the expand action is used", async () => {
      // Given
      const user = userEvent.setup();
      render(
        <DataTable<Row>
          columns={[createExpandColumn<Row>(), nameColumn(), { id: "region", accessorKey: "region", header: "Región" }]}
          data={sampleRows}
          pagination={false}
          renderSubComponent={({ row }) => <div>Detalle de {row.original.name}</div>}
          tableOptions={{ getRowCanExpand: () => true }}
        />,
      );

      // Then
      expect(screen.queryByText("Detalle de Ana")).not.toBeInTheDocument();

      // When
      await user.click(screen.getAllByRole("button", { name: /expandir fila/i })[0]);

      // Then
      expect(screen.getByText("Detalle de Ana")).toBeInTheDocument();

      // When
      await user.click(screen.getByRole("button", { name: /contraer fila/i }));

      // Then
      expect(screen.queryByText("Detalle de Ana")).not.toBeInTheDocument();
    });

    it("should render expanded detail rows from controlled expanded state", () => {
      // Given
      const onExpandedChange = vi.fn();
      render(
        <DataTable<Row>
          columns={[createExpandColumn<Row>(), nameColumn(), { id: "region", accessorKey: "region", header: "Región" }]}
          data={sampleRows}
          pagination={false}
          renderSubComponent={({ row }) => <div>Detalle controlado de {row.original.name}</div>}
          tableOptions={{
            getRowId: (row) => row.id,
            getRowCanExpand: () => true,
            state: { expanded: { "1": true } },
            onExpandedChange,
          }}
        />,
      );

      // Then
      expect(screen.getByText("Detalle controlado de Ana")).toBeInTheDocument();
    });
  });
});
