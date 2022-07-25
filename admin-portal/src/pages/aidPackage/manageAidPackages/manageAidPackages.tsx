import React, { useEffect, useState } from "react";
import AidPackageDetailsTable from "./aidPackageDetailsTable";
import AidPackageTable from "./aidPackagesTable";
import "./manageAidPackages.css";
import { MedicalNeed } from "../../../types/MedicalNeeds";
import { getSupplierQuoteForNeed } from "../../../helpers/needsHelper";
import {
  getDraftAidPackageKey,
  getPeriodFromAidPackageKey,
  getSupplierIdFromAidPackageKey,
} from "../../../helpers/aidPackageHelper";
import {
  NeedAssignments,
  DraftAidPackages,
  DraftAidPackage,
} from "../../../types/AidPackage";

export default function ManageAidPackages({
  medicalNeeds,
  needAssignments,
  aidPackages,
  setAidPackages,
  handleAidPkgPublish,
}: {
  medicalNeeds: MedicalNeed[];
  needAssignments: NeedAssignments;
  aidPackages: DraftAidPackages;
  setAidPackages: (aidPackages: DraftAidPackages) => void;
  handleAidPkgPublish: (supplier: number, packageKey: string) => Promise<void>;
}) {
  const [selectedPackageKey, setSelectedPackageKey] = useState<string | null>();

  useEffect(() => {
    // get the list of need assignment keys
    const draftAidPackageKeys = new Set<string>();
    Object.keys(needAssignments).forEach((needID) => {
      needAssignments[needID].forEach((qty, supplierID) => {
        const quote = getSupplierQuoteForNeed({
          medicalNeeds,
          needID: Number(needID),
          supplierID,
        });

        draftAidPackageKeys.add(getDraftAidPackageKey(quote!));
      });
    });

    // return early if suppliers have not changed
    const sortedCurrentSupplierIds = Object.keys(aidPackages).sort();
    const sortedSupplierIds = Array.from(draftAidPackageKeys.keys()).sort();
    if (
      JSON.stringify(sortedCurrentSupplierIds) !==
      JSON.stringify(sortedSupplierIds)
    ) {
      // create aid package for each supplier (aid package + #)
      const syncedAidPackages: DraftAidPackages = {};

      Array.from(draftAidPackageKeys).forEach((draftAidPackageKey) => {
        const period = getPeriodFromAidPackageKey(draftAidPackageKey);
        const supplierID = getSupplierIdFromAidPackageKey(draftAidPackageKey);

        if (aidPackages[draftAidPackageKey]) {
          syncedAidPackages[draftAidPackageKey] =
            aidPackages[draftAidPackageKey];
        } else {
          syncedAidPackages[draftAidPackageKey] = {
            name: `Supplier - ${supplierID} Package - ${period.year}/${period.month}/${period.day}`,
            details: "",
            period,
            supplierID,
          };
        }
      });

      setAidPackages(syncedAidPackages);
    }
  }, [setAidPackages, aidPackages, needAssignments]);

  return (
    <>
      <AidPackageTable
        aidPackages={aidPackages}
        setSelectedPackage={setSelectedPackageKey}
        handleAidPkgPublish={handleAidPkgPublish}
        medicalNeeds={medicalNeeds}
        needAssignments={needAssignments}
      />
      {selectedPackageKey && (
        <AidPackageDetailsTable
          selectedPackage={aidPackages[selectedPackageKey]}
          updateAidPackage={(updatedPackage: DraftAidPackage) => {
            setAidPackages({
              ...aidPackages,
              [selectedPackageKey]: updatedPackage,
            });
          }}
          selectedPackageKey={selectedPackageKey}
          needAssignments={needAssignments}
          medicalNeeds={medicalNeeds}
        />
      )}
    </>
  );
}
