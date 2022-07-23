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

  useEffect(() => {
    getPledgeStatus(aidStatus);
  }, []);

  const [pledgeActive, setPledgeActice] = useState<boolean>();
  const [paymentInitatedActive, setPatmetInitiatedActive] = useState<boolean>();
  const [paymentComfirm, setPaymentConfirActive] = useState<boolean>();

  const statusToAllowedPackages = {
    pulished: [AidPackage.Status.Published],
    awaitPayment: [AidPackage.Status.AwaitingPayment],
    paymentConfirm: [
      AidPackage.Status.Delivered,
      AidPackage.Status.Ordered,
      AidPackage.Status.ReceivedAtMOH,
      AidPackage.Status.Shipped,
    ],
  };

  function getPledgeStatus(status: AidPackage.Status) {
    if (statusToAllowedPackages.pulished.includes(status)) {
      setPledgeActice(false);
      setPatmetInitiatedActive(true);
      setPaymentConfirActive(true);
    }

    if (statusToAllowedPackages.awaitPayment.includes(status)) {
      setPledgeActice(true);
      setPatmetInitiatedActive(false);
      setPaymentConfirActive(false);
    }

    if (statusToAllowedPackages.paymentConfirm.includes(status)) {
      setPledgeActice(true);
      setPatmetInitiatedActive(true);
      setPaymentConfirActive(false);
    }
  }

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
          <option value={Pledge.Status.Pledged} disabled={pledgeActive}>
            {Pledge.Status.Pledged}
          </option>
          <option
            value={Pledge.Status.PaymentInitiated}
            disabled={paymentInitatedActive}
          >
            {Pledge.Status.PaymentInitiated}
          </option>
          <option
            value={Pledge.Status.PaymentConfirmed}
            disabled={paymentComfirm}
          >
            {Pledge.Status.PaymentConfirmed}
          </option>
        </select>
      </div>
    </div>
  );
}
