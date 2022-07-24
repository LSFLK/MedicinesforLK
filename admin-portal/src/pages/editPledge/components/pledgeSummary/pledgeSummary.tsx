import React, { ChangeEvent, useEffect, useState } from "react";
import "./pledgeSummary.css";
import { Donor } from "../../../../types/Donor";
import { Pledge } from "../../../../types/Pledge";
import { AidPackage } from "types/AidPackage";
import { stat } from "fs";

interface PledgeSummaryProps {
  donor: Donor;
  pledge: Pledge;
  onStatusChange: (status: Pledge.Status) => void;
  aidStatus: AidPackage.Status;
}

export default function PledgeSummary({
  donor,
  pledge,
  onStatusChange,
  aidStatus,
}: PledgeSummaryProps) {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.currentTarget.value as Pledge.Status;
    if (newStatus !== pledge.status) {
      onStatusChange(newStatus);
    }
  };

  const statusToAllowedPackages = {
    pulished: [AidPackage.Status.Published],
    awaitPayment: [AidPackage.Status.AwaitingPayment],
    paymentConfirm: [
      AidPackage.Status.AwaitingPayment,
      AidPackage.Status.Delivered,
      AidPackage.Status.Ordered,
      AidPackage.Status.ReceivedAtMOH,
      AidPackage.Status.Shipped,
    ],
  };

  return (
    <div className="pledgeSummary">
      <div className="heading">Donor:</div>
      <div>{donor.orgName}</div>
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
        <select
          value={pledge.status}
          placeholder={pledge.status}
          onChange={handleStatusChange}
        >
          <option
            value={Pledge.Status.Pledged}
            disabled={!statusToAllowedPackages.pulished.includes(aidStatus)}
          >
            {Pledge.Status.Pledged}
          </option>
          <option
            value={Pledge.Status.PaymentInitiated}
            disabled={!statusToAllowedPackages.awaitPayment.includes(aidStatus)}
          >
            {Pledge.Status.PaymentInitiated}
          </option>
          <option
            value={Pledge.Status.PaymentConfirmed}
            disabled={
              !statusToAllowedPackages.paymentConfirm.includes(aidStatus)
            }
          >
            {Pledge.Status.PaymentConfirmed}
          </option>
        </select>
      </div>
    </div>
  );
}
