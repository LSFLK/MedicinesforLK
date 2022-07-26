import React from "react";

import { AidPackage } from "../../../../types/AidPackage";
import TableRows from "./components/tableRows/tableRows";

interface TableProps {
  aidPackages: AidPackage[];
}

export default function Table(props: TableProps) {
  const { aidPackages } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Aid Package</th>
          <th>Status</th>
          <th>Pledges</th>
          <th>Supplier</th>
          <th> </th>
        </tr>
      </thead>
      {aidPackages && aidPackages.length > 0 && (
        <TableRows aidPackages={aidPackages} />
      )}
    </table>
  );
}
