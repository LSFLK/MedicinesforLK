import React from "react";
import './pledgeSummary.css';
import {Donor} from "../../../../types/Donor";
import {Pledge} from "../../../../types/Pledge";

interface PledgeSummaryProps {
  donor: Donor;
  pledge: Pledge;
}

const statusToLabel: { [key in Pledge.Status]: string } = {
  Created: "Created",
  PaymentInitiated: "Payment Initiated",
  PaymentConfirmed: "Payment Confirmed",

}

export default function PledgeSummary({donor, pledge}: PledgeSummaryProps) {
  return (
    <div className="pledgeSummary">
      <div className="heading">Donor:</div>
      <div>{donor.orgName}</div>
      <div className="heading">Amount:</div>
      <div>$ {pledge.amount}</div>
      <div className="heading">Status:</div>
      <div>
        <select>
          {Object.entries(statusToLabel).map(([status, label], index) => (
            <option key={status}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
