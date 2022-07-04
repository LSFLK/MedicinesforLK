import React from "react";
import { useNavigate } from "react-router-dom";
import { AidPackage } from "types/AidPackage";

interface TableRowProps {
  aidPackage: AidPackage;
}

export function TableRow(props: TableRowProps) {
  const { aidPackage } = props;
  const navigate = useNavigate();

  return (
    <tr>
      <td>{aidPackage.name}</td>
      <td>{aidPackage.status}</td>
      <td>75%</td>
      <td>Brolin Pharmaceutical Suppliers</td>
      <td>
        <div className="tableButtonLayer">
          <button onClick={() => navigate(`/packages/${aidPackage.packageID}`)}>
            {" "}
            Details{" "}
          </button>
          <button
            onClick={() =>
              navigate(`/packages/${aidPackage.packageID}/pledge-status`)
            }
          >
            {" "}
            Pledges{" "}
          </button>
        </div>
      </td>
    </tr>
  );
}
