import React, { ChangeEvent } from "react";
import "./pledgeSummary.css";
import { Donor } from "../../../../types/Donor";
import { Pledge } from "../../../../types/Pledge";

interface PledgeSummaryProps {
  donor: Donor;
  pledge: Pledge;
  onStatusChange: (status: Pledge.Status, label: string) => void;
}

const statusToLabel: { [key in Pledge.Status]: string } = {
  Created: "Created",
  PaymentInitiated: "Payment Initiated",
  PaymentConfirmed: "Payment Confirmed",
};

export default function PledgeSummary({
  donor,
  pledge,
  onStatusChange,
}: PledgeSummaryProps) {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.currentTarget.value as Pledge.Status;
    if (newStatus !== pledge.status) {
      onStatusChange(newStatus, statusToLabel[newStatus]);
    }
  };

  return (
    <div className="pledgeSummary">
      <div className="heading">Donor:</div>
      <div>{donor.orgName}</div>
      <div className="heading">Amount:</div>
      <div>$ {pledge.amount}</div>
      <div className="heading">Status:</div>
      <div>
        <select onChange={handleStatusChange} value={pledge.status}>
          {Object.entries(statusToLabel).map(([status, label], index) => (
            <option key={status} value={status}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
