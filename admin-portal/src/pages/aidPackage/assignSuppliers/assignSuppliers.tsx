import { NeedsInfo, SupplierQuote } from "data/medical-needs.mock.data";
import { useState, useEffect, useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { NeedAssignments } from "../aidPackage";

export function AssignSuppliers({
  needAssignments,
  setNeedAssignments,
  medicalNeeds,
}: {
  needAssignments: NeedAssignments;
  setNeedAssignments: (needAssignments: NeedAssignments) => void;
  medicalNeeds: Array<NeedsInfo>;
}) {
  const getAssignedCount = (
    need: NeedsInfo,
    needAssignments: NeedAssignments
  ) => {
    return Array.from(needAssignments[need.needID].values()).reduce(
      (currentSum, value) => currentSum + value,
      0
    );
  };

  const data = useMemo<Array<{ [key: string]: any }>>(
    () =>
      medicalNeeds.map((need) => {
        const periodDate = new Date(
          need.period.year,
          need.period.month - 1,
          need.period.day
        );
        return {
          needID: need.needID,
          need: need.name,
          period: periodDate.toLocaleDateString(),
          qtyNeeded: need.remainingQuantity.toString(),
          remainingNeed:
            need.remainingQuantity - getAssignedCount(need, needAssignments),
          supplierQuotes: need.supplierQuotes || [],
          expanded: true,
        };
      }),
    [medicalNeeds, needAssignments]
  );

  const columns = useMemo(
    () => [
      {
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }: any) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "⌄" : "›"}
          </span>
        ),
      },
      {
        Header: "Need",
        accessor: "need",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Period",
        accessor: "period",
      },
      {
        Header: "Quantity Needed",
        accessor: "qtyNeeded",
      },
      {
        Header: "Remaining Need",
        accessor: "remainingNeed",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data, autoResetHiddenColumns: false }, useExpanded);

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{}}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);

          const needsID = row.original["needID"];
          const currentAssignments = needAssignments[needsID];
          const remainingNeed = row.values["remainingNeed"];

          return (
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
              {(row as any).isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    <SupplierNeedAllocationTable
                      supplierQuotes={row.original.supplierQuotes}
                      assignmentsForSupplier={needAssignments[needsID]}
                      setAssignmentForSupplier={(
                        supplierID: number,
                        quantity: number
                      ) => {
                        const updatedAssignments = currentAssignments.set(
                          supplierID,
                          Number(quantity)
                        );

                        setNeedAssignments({
                          ...needAssignments,
                          [needsID]: updatedAssignments,
                        });
                      }}
                      remainingNeed={remainingNeed}
                    />
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
      </tbody>
    </table>
  );
}

function SupplierNeedAllocationTable({
  supplierQuotes,
  setAssignmentForSupplier,
  remainingNeed,
  assignmentsForSupplier,
}: {
  supplierQuotes: SupplierQuote[];
  setAssignmentForSupplier: any;
  remainingNeed: number;
  assignmentsForSupplier: Map<number, number>;
}) {
  supplierQuotes = supplierQuotes || [];

  const data = useMemo<Array<{ [key: string]: any }>>(
    () =>
      supplierQuotes.map((quote) => ({
        supplier: quote.supplier.name,
        quantity: assignmentsForSupplier.get(quote.supplierID),
        max: Math.min(remainingNeed, quote.availableQuantity),
        supplierID: quote.supplierID,
      })),
    [supplierQuotes, assignmentsForSupplier, remainingNeed]
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
  updateAssignment, // This is a custom function that we supplied to our table instance
}: any) {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
    updateAssignment(index, id, e.target.value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input type="number" value={value} onChange={onChange} />;
}
