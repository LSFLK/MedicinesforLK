import React from "react";
import { AidPackage } from "../../../../types/AidPackage";
import "./styles.css";

interface PackageStatusProps {
  currentStatus: AidPackage.Status;
}

export default function PackageStatus({ currentStatus }: PackageStatusProps) {
  return (
    <div className="packageStatus">
      <p className="heading">Status</p>
      <div>
        <div>
          {Object.entries(AidPackage.Status).map(([key, status], index) => (
            <span className="statusLabel" key={key}>
              {status !== AidPackage.Status.Draft && (
                <>
                  {status === currentStatus && (
                    <span className="checkMark">✔ </span>
                  )}
                  {status}
                  {index + 1 < Object.entries(AidPackage.Status).length && (
                    <span>&nbsp;&gt;&nbsp;</span>
                  )}
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
