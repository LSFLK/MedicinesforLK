import React, { useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { AidPackages } from "../../aidPackage";

export function AidPackageTable({
  aidPackages,
  setSelectedPackage,
  handleAidPkgPublish,
}: {
  aidPackages: AidPackages;
  setSelectedPackage: (supplierID: number | null) => void;
  handleAidPkgPublish: (suppllierId: number) => Promise<void>;
}) {
  const data = useMemo(
    () =>
      Object.keys(aidPackages)
        .filter((key) => {
          let supplierID = Number(key);
          return !aidPackages[supplierID].isPublished;
        })
        .map((key) => {
          let supplierID = Number(key);
          return {
            name: aidPackages[supplierID].name,
            supplier: supplierID,
            description: aidPackages[supplierID].details,
            period: null,
            totalCost: 0,
            isPublished: aidPackages[supplierID].isPublished,
          };
        }),
    [aidPackages]
  );

  /**
   * calls the drilled in publish handler prop
   * and upon success removes the row.
   * @param supplierId
   * @param setIsUploading
   */
  const handlePublish = (
    supplierId: number,
    setIsUploading: (uploading: boolean) => void
  ) => {
    setIsUploading(true);
    handleAidPkgPublish(supplierId)
      .then(() => {
        setSelectedPackage(null);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

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
        Cell: ({ row }: any) => {
          let [isUploading, setIsUploading] = useState(false);
          return (
            <button
              onClick={() =>
                handlePublish(row.original.supplier, setIsUploading)
              }
              disabled={isUploading}
            >
              {isUploading
                ? "Publishing..."
                : row.original.isPublished
                ? "Published"
                : "Publish"}
            </button>
          );
        },
      },
    ],
    [aidPackages, data]
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
          console.log(row);
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
