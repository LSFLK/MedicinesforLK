import React, { ChangeEvent } from "react";
import PledgeService from "../../../../apis/services/PledgeService";
import { AidPackage } from "../../../../types/AidPackage";
import { Pledge } from "../../../../types/Pledge";

interface PledgeStatusSelectorProps {
  pledge: Pledge;
  aidPackageStatus: AidPackage.Status;
  setPledge?: (prevPledge: any) => any;
  updatePledge?: (pledge: Pledge, newPledgeStatus: Pledge.Status) => void;
}

const pledgeStatusToAllowedStatuses: Record<
  Pledge.Status,
  AidPackage.Status[]
> = {
  [Pledge.Status.Pledged]: [
    AidPackage.Status.Published,
    AidPackage.Status.AwaitingPayment,
  ],
  [Pledge.Status.PaymentInitiated]: [AidPackage.Status.AwaitingPayment],
  [Pledge.Status.PaymentConfirmed]: [
    AidPackage.Status.Delivered,
    AidPackage.Status.Ordered,
    AidPackage.Status.ReceivedAtMOH,
    AidPackage.Status.Shipped,
    AidPackage.Status.AwaitingPayment,
  ],
};

const pledgeStatusSelector: React.FC<PledgeStatusSelectorProps> = ({
  pledge,
  aidPackageStatus,
  setPledge,
  updatePledge,
}: PledgeStatusSelectorProps) => {
  const handleStatusChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.currentTarget.value as Pledge.Status;
    if (newStatus !== pledge.status) {
      const confirmed = window.confirm(
        `Are you sure you want to change the status to ${newStatus}?`
      );
      if (confirmed) {
        try {
          await PledgeService.updatePledgeStatus(pledge.pledgeID!, newStatus);

          if (setPledge) {
            setPledge((prevPledge: any) => ({
              ...prevPledge!,
              status: newStatus,
            }));
          } else if (updatePledge) {
            updatePledge(pledge, newStatus);
          }
        } catch (error) {
          alert("An error occurred when trying to change the status");
        }
      }
    }
  };

  return (
    <div>
      <select onChange={handleStatusChange} value={pledge.status}>
        {Object.entries(Pledge.Status).map(([key, status]) => (
          <option
            key={key}
            value={status}
            disabled={
              !pledgeStatusToAllowedStatuses[status].includes(aidPackageStatus)
            }
          >
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default pledgeStatusSelector;
