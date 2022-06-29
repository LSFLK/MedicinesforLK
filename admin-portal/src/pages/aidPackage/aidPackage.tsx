import { useEffect, useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";
import { AssignSuppliers } from "./assignSuppliers/assignSuppliers";
import { ManageAidPackages } from "./manageAidPackages/manageAidPackages";
import { fetchMedicalNeeds, NeedsInfo } from "data/medical-needs.mock.data";
import AdminDataServices from "../../apis/services";

import "./aidPackage.css";

enum STEPS {
  ASSIGN_SUPPLIERS,
  MANAGE_AID_PACKAGES,
}

export type NeedAssignments = {
  [needID: string]: Map<number, number>; // Map<supplierId: quantity>
};

export type AidPackage = { name: string; details: string };
export type AidPackages = {
  [supplierID: number]: AidPackage;
};

export function CreateAidPackage() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [needAssignments, setNeedAssignments] = useState<NeedAssignments>({});
  const [medicalNeeds, setMedicalNeeds] = useState<Array<NeedsInfo>>([]);
  const [aidPackages, setAidPackages] = useState<AidPackages>({});

  useEffect(() => {
    fetchMedicalNeeds().then((response) => {
      setMedicalNeeds(response.medicalNeedInfo);
      setNeedAssignments(
        response.medicalNeedInfo.reduce(
          (previousValue: NeedAssignments, currentValue) => {
            previousValue[currentValue.needID] = new Map();
            return previousValue;
          },
          {}
        )
      );
    });

    AdminDataServices.getAidPackages().then((res: any) => {
      console.log(JSON.stringify(res));
    });
  }, []);

  const goToStep = (step: STEPS) => {
    setCurrentFormStep(step);
  };

  return (
    <Page selection={PageSelection.PACKAGE_CREATION}>
      <main className="">
        <h1>Create an Aid Package</h1>
        <Stepper activeStep={currentFormStep}>
          <Step title="Assign Suppliers" />
          <Step title="Manage Aid Packages" />
        </Stepper>
        {currentFormStep === STEPS.ASSIGN_SUPPLIERS && (
          <>
            <AssignSuppliers
              medicalNeeds={medicalNeeds}
              needAssignments={needAssignments}
              setNeedAssignments={setNeedAssignments}
            />
            <button onClick={() => goToStep(STEPS.MANAGE_AID_PACKAGES)}>
              Next
            </button>
          </>
        )}
        {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
          <>
            <ManageAidPackages
              medicalNeeds={medicalNeeds}
              needAssignments={needAssignments}
              setNeedAssignments={setNeedAssignments}
              aidPackages={aidPackages}
              setAidPackages={setAidPackages}
            />
            <button onClick={() => goToStep(STEPS.ASSIGN_SUPPLIERS)}>
              Back
            </button>
          </>
        )}
      </main>
    </Page>
  );
}
