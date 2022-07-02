import { NeedsInfo } from "data/medical-needs.mock.data";
import { useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { NeedAssignments } from "../aidPackage";
import { SupplierNeedAllocationTable } from "./supplierNeedAllocationTable";
import "./assignSuppliers.css";

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
          needName: need.name,
          period: periodDate.toLocaleDateString(),
          requiredQuantity: need.remainingQuantity,
          remainingQuantity:
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
        accessor: "requiredQuantity",
      },
      {
        Header: "Remaining Need",
        accessor: "remainingQuantity",
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
    <table {...getTableProps()}>
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
          const requiredQuantity = row.values["requiredQuantity"];

          const remainingQuantity = row.values["remainingQuantity"];

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
              {remainingQuantity < 0 && (
                <tr>
                  <td className="need-validation-row" colSpan={6}>
                    Total assigned quantity must be less than quantity needed
                  </td>
                </tr>
              )}

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
  );
}
