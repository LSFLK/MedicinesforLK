import { useMemo } from "react";
import { useTable } from "react-table";
import { AidPackage, NeedAssignments } from "../../aidPackage";

export function AidPackageDetailsTable({
  selectedPackage,
  supplierID,
  needAssignments,
  updateAidPackage,
}: {
  selectedPackage: { name: string; details: string };
  supplierID: number;
  needAssignments: NeedAssignments;
  updateAidPackage: (updatedAidPackages: AidPackage) => void;
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
    <div className="aid-package-details">
      <hr />
      <h4>Edit Package: {selectedPackage.name}</h4>
      <div className="input-group">
        <label htmlFor="package-name">Name:</label>
        <input
          type="text"
          id="package-name"
          name="package-name"
          value={selectedPackage.name}
          onChange={(event) => {
            updateAidPackage({ ...selectedPackage, name: event.target.value });
          }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="package-description">Description:</label>
        <textarea
          id="package-description"
          name="package-description"
          value={selectedPackage.details}
          onChange={(event) => {
            updateAidPackage({
              ...selectedPackage,
              details: event.target.value,
            });
          }}
        />
      </div>

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
    </div>
  );
}
