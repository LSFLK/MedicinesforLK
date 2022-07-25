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
        <tbody>
          {pledges.map((pledge) => (
            <tr key={pledge.pledgeID}>
              <td>{pledge.donor.orgName}</td>
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
      </table>
    </div>
  );
}
