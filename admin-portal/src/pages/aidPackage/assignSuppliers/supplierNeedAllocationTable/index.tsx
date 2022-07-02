import { SupplierQuote } from "data/medical-needs.mock.data";
import { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";

export function SupplierNeedAllocationTable({
  supplierQuotes,
  setAssignmentForSupplier,
  requiredQuantity,
  assignmentsForSupplier,
}: {
  supplierQuotes: SupplierQuote[];
  setAssignmentForSupplier: any;
  requiredQuantity: number;
  assignmentsForSupplier: Map<number, number>;
}) {
  supplierQuotes = supplierQuotes || [];

  const data = useMemo<Array<{ [key: string]: any }>>(
    () =>
      supplierQuotes.map((quote) => ({
        supplier: quote.supplier.name,
        quantity: assignmentsForSupplier.get(quote.supplierID),
        max: Math.min(requiredQuantity, quote.availableQuantity),
        supplierID: quote.supplierID,
      })),
    [supplierQuotes, assignmentsForSupplier, requiredQuantity]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Max",
        accessor: "max",
      },
      {
        Header: "Order Quantity",
        accessor: "quantity",
        Cell: EditableCell,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({
      columns,
      data,
      autoResetHiddenColumns: false,
      // @ts-ignore
      updateAssignment: (index: number, id: string, value: number) => {
        const rowValues = rows[index].original;
        setAssignmentForSupplier(rowValues.supplierID, value);
      },
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateAssignment,
}: any) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
    updateAssignment(index, id, e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input type="number" value={value} onChange={onChange} />;
}
