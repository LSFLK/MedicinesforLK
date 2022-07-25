import React, { useMemo } from "react";
import { useTable } from "react-table";
import {
  getDraftAidPackageKey,
  getSupplierIdFromAidPackageKey,
} from "../../../../helpers/aidPackageHelper";
import { formatMoney, formatNumber } from "../../../../helpers/formatter";
import {
  getNeedFromId,
  getSupplierQuoteForNeed,
} from "../../../../helpers/needsHelper";
import { DraftAidPackage, NeedAssignments } from "../../../../types/AidPackage";
import { MedicalNeed } from "../../../../types/MedicalNeeds";

export default function AidPackageDetailsTable({
  selectedPackage,
  selectedPackageKey,
  needAssignments,
  updateAidPackage,
  medicalNeeds,
}: {
  selectedPackage: DraftAidPackage;
  selectedPackageKey: string;
  needAssignments: NeedAssignments;
  updateAidPackage: (updatedAidPackages: DraftAidPackage) => void;
  medicalNeeds: MedicalNeed[];
}) {
  const supplierID = getSupplierIdFromAidPackageKey(selectedPackageKey);

  const data = useMemo(
    () =>
      Object.keys(needAssignments)
        .filter((needID) => {
          return needAssignments[needID].has(supplierID);
        })
        .filter((needID) => {
          const supplierQuote = getSupplierQuoteForNeed({
            medicalNeeds,
            needID: Number(needID),
            supplierID,
          });

          return selectedPackageKey === getDraftAidPackageKey(supplierQuote!);
        })
        .map((needID) => {
          const need = getNeedFromId(medicalNeeds, Number(needID));
          const supplierQuote = getSupplierQuoteForNeed({
            medicalNeeds,
            needID: Number(needID),
            supplierID,
          });

          const quantity = needAssignments[needID].get(supplierID) || 0;
          const totalCost = (supplierQuote?.unitPrice || 0) * quantity;

          return {
            need: need?.medicalItem.name,
            unit: need?.medicalItem.unit,
            quantity: formatNumber(quantity),
            totalCost: formatMoney(totalCost),
          };
        }),
    [needAssignments, medicalNeeds, selectedPackageKey, supplierID]
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
        <label htmlFor="package-name">
          Name:
          <input
            type="text"
            id="package-name"
            name="package-name"
            value={selectedPackage.name}
            onChange={(event) => {
              updateAidPackage({
                ...selectedPackage,
                name: event.target.value,
              });
            }}
          />
        </label>
      </div>

      <div className="input-group">
        <label htmlFor="package-description">
          Description:
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
        </label>
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
