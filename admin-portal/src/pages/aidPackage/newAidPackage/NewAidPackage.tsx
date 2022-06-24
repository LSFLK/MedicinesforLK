import { useEffect, useMemo, useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";
import { useExpanded, useTable } from "react-table";
import {
  fetchMedicalNeeds,
  NeedsInfo,
  SupplierQuote,
} from "data/medical-needs.mock.data";
import "./newAidPackage.css";

type Props = {};

type NeedAssignments = {
  [needID: string]: Array<{ quotationId: number; quantity: number }>;
};

function NewAidPackage({}: Props) {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [medicalNeeds, setMedicalNeeds] = useState<Array<NeedsInfo>>([]);
  const [needAssignments, setNeedAssignments] = useState<NeedAssignments>({});
  const [skipPageReset, setSkipPageReset] = useState(false)

  const getAssignedCount = (need: NeedsInfo) => {
    return needAssignments[need.needID].reduce(
      (count: number, current: { quotationId: number; quantity: number }) => {
        return count + current.quantity;
      },
      0
    );
  };

  useEffect(() => {
    fetchMedicalNeeds().then((response) => {
      setMedicalNeeds(response.medicalNeedInfo);
      setNeedAssignments(
        response.medicalNeedInfo.reduce(
          (previousValue: NeedAssignments, currentValue) => {
            previousValue[currentValue.needID] = [];
            return previousValue;
          },
          {}
        )
      );
    });
  }, []);

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
          need: need.name,
          period: periodDate.toLocaleDateString(),
          qtyNeeded: need.remainingQuantity.toString(),
          remainingNeed: need.remainingQuantity - getAssignedCount(need),
          supplierQuotes: need.supplierQuotes || [],
          expanded: true
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
        accessor: "qtyNeeded",
      },
      {
        Header: "Remaining Need",
        accessor: "remainingNeed",
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
    <Page selection={PageSelection.PACKAGE_CREATION}>
      <main className="">
        <h1>Create an Aid Package</h1>
        <Stepper activeStep={currentFormStep}>
          <Step title="Assign Suppliers" />
          <Step title="Manage Aid Packages" />
        </Stepper>
        {currentFormStep == 0 && (
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
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
                    {(row as any).isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          <SupplierNeedAllocationTable
                            supplierQuotes={row.original.supplierQuotes}
                            setAssignmentForSupplier={(supplierId: string, assignment: number) => {
                              setNeedAssignments({
                                ...needAssignments,
                                [row.original['needID']]: [{quotationId: supplierId, quantity: assignment}]
                              })
                            }}
                          />
                        </td>
                      </tr>
                    ) : null}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </Page>
  );
}

function SupplierNeedAllocationTable({
  supplierQuotes,
  setAssignmentForSupplier
}: {
  supplierQuotes: SupplierQuote[];
  setAssignmentForSupplier: any;
}) {
  supplierQuotes = supplierQuotes || [];

  const data = useMemo<Array<{ [key: string]: any }>>(
    () =>
      supplierQuotes.map((quote) => ({
        supplier: quote.supplier.name,
        max: quote.availableQuantity,
      })),
    [supplierQuotes]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Max",
        accessor: "max",
      },
      {
        Header: "Order Quantity",
        accessor: "qtyOrder",
        Cell: EditableCell,
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
        const supplier = rows[index].values[id];
        setAssignmentForSupplier(supplier, value)
      },
    });

  return (
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
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

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateAssignment, // This is a custom function that we supplied to our table instance
}: any) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
    updateAssignment(index, id, e.target.value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input type="number" value={value} onChange={onChange}  />
  );
};

export default NewAidPackage;
