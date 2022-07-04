import { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { AidPackages } from "../../aidPackage";

export function AidPackageTable({
  aidPackages,
  setSelectedPackage,
}: {
  aidPackages: AidPackages;
  setSelectedPackage: (supplierID: number) => void;
}) {
  const data = useMemo(
    () =>
      Object.keys(aidPackages).map((key) => {
        let supplierID = Number(key);

        return {
          name: aidPackages[supplierID].name,
          supplier: supplierID,
          description: aidPackages[supplierID].details,
          period: null,
          totalCost: 0,
        };
      }),
    [aidPackages]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "period",
        accessor: "period",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
      },
      {
        Header: "Actions",
        Cell: () => (
          <button
            className="btn secondary small"
            onClick={(event) => {
              event.stopPropagation();
              // TODO: prepare and submit record
              // TODO: remove row if successful & show toast
            }}
          >
            Publish
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      // @ts-ignore
      columns,
      data,
      autoResetSelectedRows: false,
    },
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    toggleAllRowsSelected,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead className="manage-package-header-row">
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
            <tr
              {...row.getRowProps()}
              onClick={() => {
                setSelectedPackage(row.original.supplier);
                toggleAllRowsSelected(false);
                // @ts-ignore
                row.toggleRowSelected(true);
              }}
              className={`manage-package-row ${
                // @ts-ignore
                row.isSelected && "manage-package-row--selected"
              }`}
            >
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
