import React from "react";
import "./packageStatus.css";
import { AidPackage } from "../../../../types/AidPackage";

interface PackageStatusProps {
  currentStatus: AidPackage.Status;
  onStatusChange: (statusToBeChanged: AidPackage.Status) => void;
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
          {Object.entries(AidPackage.Status).map(([key, status], index) => (
            <span className="statusLabel" key={key}>
              <input
                type="checkbox"
                id={key}
                checked={status === currentStatus}
                onChange={() => {
                  onStatusChange(status as AidPackage.Status);
                }}
              />
              <label htmlFor={key}>{status}</label>
              {index + 1 < Object.entries(AidPackage.Status).length && (
                <span>&nbsp;&gt;&nbsp;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
