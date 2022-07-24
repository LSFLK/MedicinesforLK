import React, { ReactElement, useEffect, useState } from "react";
import { AidPackage } from "../../../../../../types/AidPackage";
import TableRow from "../tableRow/tableRow";

interface TableRowsProps {
  aidPackages?: AidPackage[];
}

export default function TableRows(props: TableRowsProps) {
  const { aidPackages } = props;
  const [tableRows, setTableRows] = useState<ReactElement[]>();

  useEffect(() => {
    const getTableRows = () => {
      const rows: ReactElement[] = [];
      if (aidPackages) {
        aidPackages.forEach((value: AidPackage) => {
          rows.push(<TableRow aidPackage={value} />);
        });
      }
      return rows;
    };
    setTableRows(getTableRows());
  }, [aidPackages]);
  return <tbody>{tableRows}</tbody>;
}
