import React from "react";
import { AidPackage } from "../../../types/AidPackage";
import { Pledge } from "../../../types/Pledge";
import PledgeStatusSelector from "../../editPledge/components/pledgeStatusSelector/pledgeStatusSelector";

interface DonorTableProps {
  pledges: Pledge[];
  setPledges: (pledges: Pledge[]) => void;
  onPledgeDelete: (pledge: Pledge) => void;
  onPledgeEdit: (pledge: Pledge) => void;
  aidPackageStatus: AidPackage.Status;
}

export default function DonorTable({
  pledges,
  setPledges,
  onPledgeEdit,
  onPledgeDelete,
  aidPackageStatus,
}: DonorTableProps) {
  const updatePledgeStatus = (
    pledge: Pledge,
    newPledgeStatus: Pledge.Status
  ) => {
    const pledgeIndex = pledges.indexOf(pledge);
    const updatedPledge = { ...pledge, status: newPledgeStatus };
    const updatedPledgesArr = [...pledges];
    updatedPledgesArr[pledgeIndex] = updatedPledge;
    setPledges(updatedPledgesArr);
  };
  const [isPending, startTransition] = React.useTransition()

  return (
    <div>
      <p style={{ fontWeight: "600" }}>Donor Pledges</p>
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
            {pledges &&
              pledges.map((pledge: Pledge) => (
                <tr key={pledge.pledgeID}>
                  <td>
                    {pledge.donor ? pledge.donor.displayName : pledge.donorID}
                  </td>
                  <td>
                    $
                    {pledge.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <PledgeStatusSelector
                      pledge={pledge}
                      aidPackageStatus={aidPackageStatus}
                      updatePledge={updatePledgeStatus}
                    />
                  </td>
                  <td>
                    <button disabled={isPending} type="button" onClick={() => {
                      startTransition(() => {
                        onPledgeEdit(pledge)
                      })
                    }}>
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        startTransition(() => {
                          onPledgeDelete(pledge)
                        })
                      }}
                    >
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
