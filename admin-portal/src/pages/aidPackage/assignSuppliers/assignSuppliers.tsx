import React, { useMemo, useState } from "react";
import {
  useTable,
  useExpanded,
  useGlobalFilter,
  CellValue,
  useAsyncDebounce,
} from "react-table";
import moment from "moment";
import SupplierNeedAllocationTable from "./supplierNeedAllocationTable";
import { MedicalNeed } from "../../../types/MedicalNeeds";
import "./assignSuppliers.css";
import { NeedAssignments, DraftAidPackages } from "../../../types/AidPackage";

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: any;
  setGlobalFilter: any;
}) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((filter) => {
    setGlobalFilter(filter || undefined);
  }, 50);

  return (
    <div
      className="packageTableSearch"
      style={{
        position: "sticky",
        top: 0,
        background: "white",
        paddingBottom: "1rem",
      }}
    >
      <div className="searchContainer">
        <img src="/assets/svg/search_icon.svg" alt="search-icon" />
        <input
          placeholder="Search"
          className="textField"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default function AssignSuppliers({
  needAssignments,
  setNeedAssignments,
  medicalNeeds,
  aidPackages,
  setIsValidAssignment,
}: {
  needAssignments: NeedAssignments;
  setNeedAssignments: (needAssignments: NeedAssignments) => void;
  medicalNeeds: MedicalNeed[];
  aidPackages: DraftAidPackages;
  setIsValidAssignment: (isValid: boolean) => void;
}) {
  const getAssignedCount = (
    need: MedicalNeed,
    needAssignment: NeedAssignments
  ) => {
    return Array.from(needAssignment[need.needID!].values()).reduce(
      (currentSum, value) => (currentSum as number) + (value || 0),
      0
    ) as number;
  };

  const data = useMemo<Array<{ [key: string]: any }>>(() => {
    let isValidSupplierAssignments = true;
    const needs = medicalNeeds
      .filter((need) => need.supplierQuotes.length)
      .map((need) => {
        const remainingQuantity =
          need.remainingQuantity - getAssignedCount(need, needAssignments);
        const periodDate = new Date(
          need.period.year,
          need.period.month - 1,
          need.period.day
        );

        // all remaining quantities must be zero or positive
        if (remainingQuantity < 0) {
          isValidSupplierAssignments = false;
        }

        // all assignments must be less than supplier max and more than 0
        const assignmentForNeed = needAssignments[need.needID!];
        need.supplierQuotes.forEach((quote) => {
          const assignedFromQuote = assignmentForNeed.get(quote.supplierID);
          if (!assignedFromQuote) {
            if (assignedFromQuote === 0) {
              isValidSupplierAssignments = false;
            }
            return;
          }

          if (assignedFromQuote > quote.availableQuantity) {
            isValidSupplierAssignments = false;
          }
        });

        return {
          needID: need.needID,
          needName: need.medicalItem.name,
          unit: need.medicalItem.unit,
          beneficiary: need.beneficiary?.name,
          urgency: need.urgency,
          period: moment(periodDate).format("DD/MM/YYYY"),
          requiredQuantity: need.neededQuantity,
          remainingQuantity,
          suppliers: need.supplierQuotes
            .map((quote) => quote.supplier.name)
            .join(", "),
          supplierQuotes: need.supplierQuotes || [],
        };
      });

    setIsValidAssignment(isValidSupplierAssignments);

    return needs;
  }, [medicalNeeds, setIsValidAssignment, needAssignments]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        minWidth: 40,
        id: "expander", // It needs an ID
        Cell: ({ row }: any) => (
          <span
            className={`expander ${row.isExpanded && "expanded"}`}
            {...row.getToggleRowExpandedProps()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        ),
      },
      {
        Header: "Need",
        accessor: "needName",
      },
      {
        Header: "Beneficiary",
        accessor: "beneficiary",
      },
      {
        Header: "Unit",
        accessor: "unit",
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
        Header: "Quantity Needed",
        accessor: "requiredQuantity",
        Cell: ({ value }: { value: CellValue }) => (
          <div className="aid-package-quantity">{value.toLocaleString()}</div>
        ),
      },
      {
        Header: "Remaining Need",
        accessor: "remainingQuantity",
        Cell: ({ value }: { value: CellValue }) => (
          <div className="aid-package-quantity">{value.toLocaleString()}</div>
        ),
      },
      {
        Header: "Urgency",
        accessor: "urgency",
      },
      {
        Header: "Suppliers",
        accessor: "suppliers",
        className: "suppliers-cell",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    visibleColumns,
    // @ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      autoResetExpanded: false,
    },
    useGlobalFilter,
    useExpanded
  );

  return (
    <>
      <GlobalFilter
        // @ts-ignore
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} className="aid-package-table">
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
          {rows.map((row) => {
            prepareRow(row);

            const needsID = row.original.needID;
            const currentAssignments = needAssignments[needsID];
            const { requiredQuantity } = row.values;

            const { remainingQuantity } = row.values;

            return (
              <>
                <tr {...row.getRowProps()} className="needs-row">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        // @ts-ignore
                        className={cell.column?.className}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {remainingQuantity < 0 && (
                  <tr>
                    <td className="need-validation-row" colSpan={8}>
                      Total assigned quantity must be less than quantity needed
                    </td>
                  </tr>
                )}

                {(row as any).isExpanded ? (
                  <tr>
                    <td
                      className="supplier-allocation-table-container"
                      colSpan={visibleColumns.length}
                    >
                      <SupplierNeedAllocationTable
                        supplierQuotes={row.original.supplierQuotes}
                        assignmentsForSupplier={needAssignments[needsID]}
                        aidPackages={aidPackages}
                        setAssignmentForSupplier={(
                          supplierID: number,
                          quantity: string
                        ) => {
                          const updatedAssignments = currentAssignments.set(
                            supplierID,
                            quantity === "" ? null : Number(quantity)
                          );

                          setNeedAssignments({
                            ...needAssignments,
                            [needsID]: new Map(updatedAssignments),
                          });
                        }}
                        requiredQuantity={requiredQuantity}
                      />
                    </td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
