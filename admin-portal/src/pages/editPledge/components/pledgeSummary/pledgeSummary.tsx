import React, { ChangeEvent } from "react";
import "./pledgeSummary.css";
import { Donor } from "../../../../types/Donor";
import { Pledge } from "../../../../types/Pledge";

interface PledgeSummaryProps {
  donor: Donor;
  pledge: Pledge;
  onStatusChange: (status: Pledge.Status) => void;
}

export default function PledgeSummary({
  donor,
  pledge,
  onStatusChange,
}: PledgeSummaryProps) {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.currentTarget.value as Pledge.Status;
    if (newStatus !== pledge.status) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="pledgeSummary">
      <div className="heading">Donor:</div>
      <div>{donor.orgName}</div>
      <div className="heading">Amount:</div>
      <div>
        ${" "}
        {pledge.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="heading">Status:</div>
      <div>
        <select onChange={handleStatusChange} value={pledge.status}>
          {Object.entries(Pledge.Status).map(([key, status], index) => (
            <option key={key} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
