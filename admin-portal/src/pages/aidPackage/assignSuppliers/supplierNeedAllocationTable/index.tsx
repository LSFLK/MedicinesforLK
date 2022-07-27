import React, { useMemo, useState, useEffect } from "react";
import moment from "moment";
import { useTable, CellValue } from "react-table";
import { formatMoney } from "../../../../helpers/formatter";
import { getDraftAidPackageKey } from "../../../../helpers/aidPackageHelper";
import { Quotation } from "../../../../types/Quotation";
import { NeedAssignment, DraftAidPackages } from "../../../../types/AidPackage";

function validateRow(
  value: string,
  maxValue: number
): { hasError: boolean; errorMessages?: Array<string> } {
  let hasError = false;
  const errorMessages = [];

  if (maxValue < Number(value)) {
    hasError = true;
    errorMessages.push("Assigned quantity must be lower than the supplier max");
  }

  if (value === "0") {
    hasError = true;
    errorMessages.push("Assigned quantity must be more than zero");
  }

  return { hasError, errorMessages };
}

function EditableCell({
  value: initialValue,
  row: { index, original },
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

  const validationResult = validateRow(value, original.max);

  return (
    <div className={`${validationResult.hasError && "has-error"}`}>
      <input
        disabled={original.published}
        type="number"
        value={value}
        onChange={onChange}
      />
      <span className="validation-message">
        {validationResult.errorMessages?.[0]}
      </span>
    </div>
  );
}

interface SupplierNeedAllocationTableProps {
  supplierQuotes: Quotation[];
  setAssignmentForSupplier: any;
  requiredQuantity: number;
  assignmentsForSupplier: NeedAssignment;
  aidPackages: DraftAidPackages;
}

export default function SupplierNeedAllocationTable({
  supplierQuotes,
  setAssignmentForSupplier,
  requiredQuantity,
  assignmentsForSupplier,
  aidPackages,
}: SupplierNeedAllocationTableProps) {
  const data = useMemo<Array<{ [key: string]: any }>>(
    () =>
      supplierQuotes.map((quote) => {
        const quantity = assignmentsForSupplier.get(quote.supplierID);

        return {
          supplier: quote.supplier.name,
          brandName: quote.brandName,
          expiryDate: moment(
            `${quote.expiryDate.day}/${quote.expiryDate.month}/${quote.expiryDate.year}`
          ).format("MM/DD/YYYY"),
          period: moment(
            `${quote.period.day}/${quote.period.month}/${quote.period.year}`
          ).format("MM/DD/YYYY"),
          quantity,
          max: Math.min(requiredQuantity, quote.availableQuantity),
          supplierID: quote.supplierID,
          published: aidPackages?.[getDraftAidPackageKey(quote)]?.isPublished,
          unitPrice: formatMoney(quote.unitPrice),
          total: formatMoney((quantity || 0) * quote.unitPrice),
        };
      }),
    [supplierQuotes, assignmentsForSupplier, requiredQuantity, aidPackages]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Brand Name",
        accessor: "brandName",
      },
      {
        Header: () => (
          <>
            <p>Period</p>
            <small className="table-sub-header">DD/MM/YY</small>
          </>
        ),
        accessor: "period",
      },
      {
        Header: () => (
          <>
            <p>Expiry Date</p>
            <small className="table-sub-header">DD/MM/YY</small>
          </>
        ),
        accessor: "expiryDate",
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice",
      },
      {
        Header: "Max",
        accessor: "max",
        Cell: ({ value }: { value: CellValue }) => (
          <div>{value.toLocaleString()}</div>
        ),
      },
      {
        Header: "Order Quantity",
        accessor: "quantity",
        Cell: EditableCell,
      },
      {
        Header: "Total Price",
        accessor: "total",
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
    <table {...getTableProps()} className="supplier-allocation-table">
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
              {row.cells.map((cell, index) => {
                return index !== 4 ? (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ) : (
                  <td {...cell.getCellProps()}>
                    {cell.value.toLocaleString()}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
