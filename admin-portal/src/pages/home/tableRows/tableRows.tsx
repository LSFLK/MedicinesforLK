import React, { ReactElement, useEffect, useState } from "react";
import { AidPackage } from "types/AidPackage";
import { AidPackages } from "types/AidPackages";
import { EmptyRow } from "../tableRow/emptyRow";
import { TableRow } from "../tableRow/tableRow";

interface TableRowsProps {
  aidPackages?: AidPackages;
}

export function TableRows(props: TableRowsProps) {
  const { aidPackages } = props;
  const [tableRows, setTableRows] = useState<ReactElement[]>();

  useEffect(() => {
    const getTableRows = () => {
      const rows: ReactElement[] = [];
      if (aidPackages) {
        aidPackages.aidPackages.forEach((value: AidPackage) => {
          rows.push(<TableRow aidPackage={value} />);
        });
      } else {
        rows.push(<EmptyRow />);
      }
      return rows;
    };

    setTableRows(getTableRows());
  }, [aidPackages]);
  return <>{tableRows}</>;
}
