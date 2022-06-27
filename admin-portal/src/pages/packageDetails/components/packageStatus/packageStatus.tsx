import React from "react";
import './packageStatus.css';
import {DonorAidPackage} from "../../../../types/DonarAidPackage";

const statusToLabel: { [key in DonorAidPackage.Status]: string } = {
  [DonorAidPackage.Status.Draft]: "Draft",
  [DonorAidPackage.Status.Published]: "Published",
  [DonorAidPackage.Status.AwaitingPayment]: "Awaiting Payment",
  [DonorAidPackage.Status.Ordered]: "Ordered",
  [DonorAidPackage.Status.Shipped]: "Shipped",
  [DonorAidPackage.Status.ReceivedAtMOH]: "Received at MOH",
  [DonorAidPackage.Status.Delivered]: "Delivered",
}

interface PackageStatusProps {
  currentStatus: DonorAidPackage.Status;
  onStatusChange: (statusToBeChanged: DonorAidPackage.Status, label: string) => void;
}

export default function PackageStatus({currentStatus, onStatusChange}: PackageStatusProps) {
  return (
    <div className="packageStatus">
      <p className="heading">Status</p>
      <div>
        <div>
          {Object.entries(statusToLabel).map(([status, label], index) => (
            <span className="statusLabel">
              <input
                type="checkbox"
                id={status}
                checked={status === currentStatus}
                onClick={() => onStatusChange(status as DonorAidPackage.Status, label)}
              />
              <label htmlFor={status}>{label}</label>
              {index + 1 < Object.entries(statusToLabel).length && (<span>&nbsp;&gt;&nbsp;</span>)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
