/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { getSupplierQuoteForNeed } from "../../../../helpers/needsHelper";
import {
  AidPackage,
  DraftAidPackages,
  NeedAssignments,
} from "../../../../types/AidPackage";
import { MedicalNeed } from "../../../../types/MedicalNeeds";
import { formatDate, formatMoney } from "../../../../helpers/formatter";
import {
  getDraftAidPackageKey,
  getSupplierIdFromAidPackageKey,
} from "../../../../helpers/aidPackageHelper";

function PublishAidPackageButton({
  handlePublish,
  supplierID,
  status,
  label,
  setIsUploading,
  packageKey,
}: {
  handlePublish: Function;
  supplierID: number;
  status: AidPackage.Status;
  label: string;
  setIsUploading: Function;
  packageKey: string;
}) {
  return (
    <button
      type="button"
      className={`table-action-button btn small ${
        status !== AidPackage.Status.Published && "secondary"
      }`}
      onClick={(event) => {
        event.stopPropagation();
        handlePublish(supplierID, packageKey, status, setIsUploading);
      }}
    >
      {label}
    </button>
  );
}

export default function AidPackageTable({
  aidPackages,
  setSelectedPackage,
  handleAidPkgPublish,
  medicalNeeds,
  needAssignments,
}: {
  aidPackages: DraftAidPackages;
  setSelectedPackage: (key: string | null) => void;
  handleAidPkgPublish: (
    supplierId: number,
    packageKey: string,
    status: AidPackage.Status
  ) => Promise<void>;
  medicalNeeds: MedicalNeed[];
  needAssignments: NeedAssignments;
}) {
  const data = useMemo(
    () =>
      Object.keys(aidPackages)
        .filter((key) => {
          return !aidPackages[key].isPublished;
        })
        .map((key) => {
          const supplierID = getSupplierIdFromAidPackageKey(key);
          let supplier: string = "";
          let period: Date = new Date();

          const needsWithSupplier = Object.keys(needAssignments)
            .filter((needID) => {
              const assignments = needAssignments[Number(needID)];
              return assignments.has(supplierID);
            })
            .filter((needID) => {
              const supplierQuote = getSupplierQuoteForNeed({
                medicalNeeds,
                needID: Number(needID),
                supplierID,
              });

              return key === getDraftAidPackageKey(supplierQuote!);
            })
            .map(Number);

          const totalCost = needsWithSupplier.reduce((currentTotal, needID) => {
            const quote = getSupplierQuoteForNeed({
              medicalNeeds,
              needID,
              supplierID,
            });

            if (!quote) return currentTotal;

            period = new Date(
              quote.period.year,
              quote.period.month - 1,
              quote.period.year
            );
            supplier = quote.supplier.name;

            return (
              currentTotal +
              (quote?.unitPrice || 0) * needAssignments[needID].get(supplierID)!
            );
          }, 0);

          return {
            key,
            name: aidPackages[key].name,
            supplierID,
            supplier,
            description: aidPackages[key].details,
            period: period ? formatDate(period) : "",
            totalCost: formatMoney(totalCost),
            isPublished: aidPackages[key].isPublished,
          };
        }),
    [aidPackages, needAssignments, medicalNeeds]
  );

  /**
   * calls the drilled in publish handler prop
   * and upon success removes the row.
   */
  const handlePublish = useCallback(
    (
      supplierId: number,
      packageKey: string,
      status: AidPackage.Status,
      setIsUploading: (uploading: boolean) => void
    ) => {
      setIsUploading(true);
      handleAidPkgPublish(supplierId, packageKey, status)
        .then(() => {
          setSelectedPackage(null);
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [handleAidPkgPublish, setSelectedPackage]
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
        Header: "Period",
        accessor: "period",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
      },
      {
        Header: "Actions",
        Cell: ({ row }: any) => {
          const [isUploading, setIsUploading] = useState(false);
          return !isUploading ? (
            <>
              <PublishAidPackageButton
                status={AidPackage.Status.Published}
                handlePublish={handlePublish}
                label="Publish"
                supplierID={row.original.supplierID}
                packageKey={row.original.key}
                setIsUploading={setIsUploading}
              />
              <PublishAidPackageButton
                status={AidPackage.Status.Draft}
                handlePublish={handlePublish}
                label="Save Draft"
                supplierID={row.original.supplierID}
                packageKey={row.original.key}
                setIsUploading={setIsUploading}
              />
            </>
          ) : (
            <p>Saving Aid Package...</p>
          );
        },
      },
    ],
    [handlePublish]
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
                setSelectedPackage(row.original.key);
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
