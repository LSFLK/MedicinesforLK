import { NeedsInfo } from "data/medical-needs.mock.data";
import { useEffect, useState } from "react";
import { AidPackages, NeedAssignments } from "../aidPackage";
import { AidPackageDetailsTable } from "./aidPackageDetailsTable";
import { AidPackageTable } from "./aidPackagesTable";

export function ManageAidPackages({
  medicalNeeds,
  needAssignments,
  setNeedAssignments,
  aidPackages,
  setAidPackages,
}: {
  medicalNeeds: Array<NeedsInfo>;
  needAssignments: NeedAssignments;
  setNeedAssignments: (needAssignments: NeedAssignments) => void;
  aidPackages: AidPackages;
  setAidPackages: (aidPackages: AidPackages) => void;
}) {
  const [selectedPackage, setSelectedPackage] = useState<number>();

  useEffect(() => {
    // get the list of suppliers assigned to a need
    const suppliers = new Set<number>();
    Object.keys(needAssignments).forEach((needID) => {
      needAssignments[needID].forEach((qty, supplierID) => {
        suppliers.add(supplierID);
      });
    });

    // create aid package for each supplier (aid package + #)
    const syncedAidPackages: AidPackages = {};
    Array.from(suppliers).forEach((supplierID, index) => {
      if (aidPackages[supplierID]) {
        syncedAidPackages[supplierID] = aidPackages[supplierID];
      } else {
        syncedAidPackages[supplierID] = {
          name: `AidPackage ${index + 1}`,
          details: "",
        };
      }
    });
    setAidPackages(syncedAidPackages);
  }, [aidPackages, setAidPackages, needAssignments]);

  return (
    <>
      <AidPackageTable
        aidPackages={aidPackages}
        setSelectedPackage={setSelectedPackage}
      />
      {selectedPackage && (
        <AidPackageDetailsTable
          selectedPackage={aidPackages[selectedPackage]}
          supplierID={selectedPackage}
          needAssignments={needAssignments}
        />
      )}
    </>
  );
}
