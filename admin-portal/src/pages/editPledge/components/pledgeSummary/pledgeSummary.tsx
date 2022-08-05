import React, { ChangeEvent } from "react";
import "./pledgeSummary.css";
import { Pledge } from "../../../../types/Pledge";
import { AidPackage } from "../../../../types/AidPackage";

interface PledgeSummaryProps {
  pledge: Pledge;
  onStatusChange: (status: Pledge.Status) => void;
  aidPackageStatus: AidPackage.Status;
}

const statusAllowPledgeStatus: Record<Pledge.Status, AidPackage.Status[]> = {
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

export default function PledgeSummary({
  pledge,
  onStatusChange,
  aidPackageStatus,
}: PledgeSummaryProps) {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.currentTarget.value as Pledge.Status;
    if (newStatus !== pledge.status) {
      onStatusChange(newStatus);
    }
  };

  function setActive(status: Pledge.Status) {
    if (
      status === Pledge.Status.Pledged &&
      statusAllowPledgeStatus[Pledge.Status.Pledged].includes(aidPackageStatus)
    ) {
      return false;
    }

    if (
      status === Pledge.Status.PaymentInitiated &&
      statusAllowPledgeStatus[Pledge.Status.PaymentInitiated].includes(
        aidPackageStatus
      )
    ) {
      return false;
    }

    if (
      status === Pledge.Status.PaymentConfirmed &&
      statusAllowPledgeStatus[Pledge.Status.PaymentConfirmed].includes(
        aidPackageStatus
      )
    ) {
      return false;
    }

    return true;
  }

  return (
    <div className="pledgeSummary">
      <div className="heading">Donor:</div>
      <div>{pledge.donor ? pledge.donor.displayName : pledge.donorID}</div>
      <div className="heading">Amount:</div>
      <div>
        $
        {pledge.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="heading">Status:</div>
      <div>
        <select onChange={handleStatusChange} value={pledge.status}>
          {Object.entries(Pledge.Status).map(([key, status]) => (
            <option key={key} value={status} disabled={setActive(status)}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
