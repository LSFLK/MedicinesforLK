import React from "react";
import { useHistory } from "react-router-dom";
import { AidPackage } from "../../../../../../types/AidPackage";

interface TableRowProps {
  aidPackage: AidPackage;
}

export default function TableRow(props: TableRowProps) {
  const { aidPackage } = props;
  const history = useHistory();
  const navigate = (path: string) => {
    history.push(path);
  };

  function handlePledgesButtonClick(packageId: number) {
    navigate(`/packages/${packageId}/pledge-status`);
  }

  function handleDetailsButtonClick(packageId: number) {
    navigate(`/packages/${packageId}`);
  }

  return (
    <tr key={aidPackage.packageID}>
      <td>{aidPackage.name}</td>
      <td>{aidPackage.status}</td>
      <td>
        {(
          (aidPackage.receivedAmount / aidPackage.goalAmount || 0) * 100
        ).toFixed(0)}
        %
      </td>
      <td>{aidPackage.aidPackageItems[0]?.quotation.supplier.name}</td>
      <td>
        <button
          type="button"
          onClick={() => handleDetailsButtonClick(aidPackage.packageID)}
        >
          Details
        </button>
        <button
          type="button"
          onClick={() => handlePledgesButtonClick(aidPackage.packageID)}
        >
          Pledges
        </button>
      </td>
    </tr>
  );
}
