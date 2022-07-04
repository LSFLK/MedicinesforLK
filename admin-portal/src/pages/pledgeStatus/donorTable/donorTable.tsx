import React from "react";
import { DonorAidPackagePledge } from "../../../types/DonarAidPackagePledge";

interface DonorTableProps {
  pledges: DonorAidPackagePledge[];
  onPledgeDelete: (pledge: DonorAidPackagePledge) => void;
  onPledgeEdit: (pledge: DonorAidPackagePledge) => void;
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
            <th />
          </tr>
        </thead>
        <tbody>
          {pledges.map((pledge) => (
            <tr key={pledge.id}>
              <td>{pledge.name}</td>
              <td>{pledge.amount}</td>
              <td>{pledge.status}</td>
              <td>
                <button onClick={() => onPledgeEdit(pledge)}>Edit</button>
                <button onClick={() => onPledgeDelete(pledge)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
