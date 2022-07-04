import { NeedsInfo } from "data/medical-needs.mock.data";
import { useEffect, useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { AidPackages, NeedAssignments } from "../aidPackage";
import { SupplierNeedAllocationTable } from "./supplierNeedAllocationTable";
import "./assignSuppliers.css";

export function AssignSuppliers({
  needAssignments,
  setNeedAssignments,
  medicalNeeds,
  aidPackages,
}: {
  needAssignments: NeedAssignments;
  setNeedAssignments: (needAssignments: NeedAssignments) => void;
  medicalNeeds: Array<NeedsInfo>;
  aidPackages: AidPackages;
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
        };
      }),
    [medicalNeeds, needAssignments]
  );

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
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
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
    // @ts-ignore
    toggleAllRowsExpanded,
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      autoResetExpanded: false,
    },
    useExpanded
  );

  useEffect(() => {
    toggleAllRowsExpanded();
  }, [medicalNeeds, toggleAllRowsExpanded]);

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
              <tr {...row.getRowProps()} className="needs-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
