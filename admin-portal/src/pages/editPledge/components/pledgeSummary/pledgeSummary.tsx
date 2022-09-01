import React from "react";
import "./pledgeSummary.css";
import { Pledge } from "../../../../types/Pledge";
import { AidPackage } from "../../../../types/AidPackage";
import PledgeStatusSelector from "../pledgeStatusSelector/pledgeStatusSelector";

interface PledgeSummaryProps {
  pledge: Pledge;
  aidPackageStatus: AidPackage.Status;
  setPledge: (prevPledge: any) => any;
}

export default function PledgeSummary({
  pledge,
  aidPackageStatus,
  setPledge,
}: PledgeSummaryProps) {
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
        {/* TODO: add this select with logic to the donor table table */}
        <PledgeStatusSelector
          aidPackageStatus={aidPackageStatus}
          pledge={pledge}
          setPledge={setPledge}
        />
      </div>
    </div>
  );
}
