import React from "react";
import "./packageStatus.css";
import { AidPackage } from "../../../../types/AidPackage";

const statusToLabel: { [key in AidPackage.Status]: string } = {
  [AidPackage.Status.Draft]: "Draft",
  [AidPackage.Status.Published]: "Published",
  [AidPackage.Status.AwaitingPayment]: "Awaiting Payment",
  [AidPackage.Status.Ordered]: "Ordered",
  [AidPackage.Status.Shipped]: "Shipped",
  [AidPackage.Status.ReceivedAtMOH]: "Received at MOH",
  [AidPackage.Status.Delivered]: "Delivered",
};

interface PackageStatusProps {
  currentStatus: AidPackage.Status;
  onStatusChange: (statusToBeChanged: AidPackage.Status, label: string) => void;
}

export default function PackageStatus({
  currentStatus,
  onStatusChange,
}: PackageStatusProps) {
  return (
    <div className="packageStatus">
      <p className="heading">Status</p>
      <div>
        <div>
          {Object.entries(statusToLabel).map(([status, label], index) => (
            <span className="statusLabel" key={status}>
              <input
                type="checkbox"
                id={status}
                checked={status === currentStatus}
                onChange={(event) => {
                  onStatusChange(status as AidPackage.Status, label);
                }}
              />
              <label htmlFor={status}>{label}</label>
              {index + 1 < Object.entries(statusToLabel).length && (
                <span>&nbsp;&gt;&nbsp;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
