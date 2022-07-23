import React, { ChangeEvent, useEffect, useState } from "react";
import "./pledgeSummary.css";
import { Donor } from "../../../../types/Donor";
import { Pledge } from "../../../../types/Pledge";
import { AidPackage } from "types/AidPackage";

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

  function getPledgeStatus(status: AidPackage.Status) {
    switch (status) {
      case AidPackage.Status.Draft:
        setPledgeActice(false);
        setPatmetInitiatedActive(false);
        setPaymentConfirActive(false);
        break;
      case AidPackage.Status.Published:
        setPledgeActice(false);
        setPatmetInitiatedActive(true);
        setPaymentConfirActive(true);
        break;
      case AidPackage.Status.AwaitingPayment:
        setPledgeActice(true);
        setPatmetInitiatedActive(false);
        setPaymentConfirActive(false);
        break;
      case AidPackage.Status.ReceivedAtMOH:
      case AidPackage.Status.Shipped:
      case AidPackage.Status.Ordered:
      case AidPackage.Status.Delivered:
        setPledgeActice(true);
        setPatmetInitiatedActive(true);
        setPaymentConfirActive(false);
        break;
      default:
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
