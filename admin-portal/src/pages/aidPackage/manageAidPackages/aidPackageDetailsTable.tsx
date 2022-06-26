import { useMemo } from "react";
import { useTable } from "react-table";
import { NeedAssignments } from "../aidPackage";

export function AidPackageDetailsTable({
  selectedPackage,
  supplierID,
  needAssignments,
}: {
  selectedPackage: { name: string; details: string };
  supplierID: number;
  needAssignments: NeedAssignments;
}) {
  const data = useMemo(
    () =>
      Object.keys(needAssignments)
        .filter((needID) => {
          return needAssignments[needID].has(supplierID);
        })
        .map((needID) => {
          return {
            need: needID,
            unit: "",
            quantity: needAssignments[needID].get(supplierID),
            totalCost: 0,
          };
        }),
    [needAssignments, supplierID]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Need",
        accessor: "need",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Order Quantity",
        accessor: "quantity",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
      },
    ],
    []
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <hr />
      <h4>Edit Package: {selectedPackage.name}</h4>
      <label>
        Name: <input type="text" value={selectedPackage.name} />
      </label>
      <label>
        Description: <textarea value={selectedPackage.details} />
      </label>

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
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
