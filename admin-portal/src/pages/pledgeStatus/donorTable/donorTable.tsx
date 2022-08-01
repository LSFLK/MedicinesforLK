import React from "react";
import { Pledge } from "../../../types/Pledge";

interface DonorTableProps {
  pledges: Pledge[];
  onPledgeDelete: (pledge: Pledge) => void;
  onPledgeEdit: (pledge: Pledge) => void;
}

export default function DonorTable({
  pledges,
  onPledgeEdit,
  onPledgeDelete,
}: DonorTableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Amount</th>
            <th>Status</th>
            <th> </th>
          </tr>
        </thead>
        {pledges.length > 0 ? (
          <tbody>
            {pledges.map((pledge: Pledge) => (
              <tr key={pledge.pledgeID}>
                <td>{pledge.donorID}</td>
                <td>
                  $
                  {pledge.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{pledge.status}</td>
                <td>
                  <button type="button" onClick={() => onPledgeEdit(pledge)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onPledgeDelete(pledge)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                This AidPackage does not yet include any pledges
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
