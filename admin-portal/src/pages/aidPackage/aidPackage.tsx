import { useEffect, useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";
import { AssignSuppliers } from "./assignSuppliers/assignSuppliers";
import { ManageAidPackages } from "./manageAidPackages/manageAidPackages";
import { fetchMedicalNeeds, NeedsInfo } from "data/medical-needs.mock.data";

import "./aidPackage.css";
import { AidPackageService } from "../../apis/services/AidPackageService";

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

    AidPackageService.getAidPackages().then((res) => {
      console.log(JSON.stringify(res));
    });
  }, []);

  const goToStep = (step: STEPS) => {
    setCurrentFormStep(step);
  };

  return (
    <Page selection={PageSelection.PACKAGE_CREATION}>
      <div className="create-aid-container">
        <h1>Create an Aid Package</h1>
        <Stepper activeStep={currentFormStep}>
          <Step
            title="Assign Suppliers"
            onClick={() => goToStep(STEPS.ASSIGN_SUPPLIERS)}
          />
          <Step
            title="Manage Aid Packages"
            onClick={() => goToStep(STEPS.MANAGE_AID_PACKAGES)}
          />
        </Stepper>

        <div className="create-aid-body">
          {currentFormStep === STEPS.ASSIGN_SUPPLIERS && (
            <AssignSuppliers
              medicalNeeds={medicalNeeds}
              needAssignments={needAssignments}
              setNeedAssignments={setNeedAssignments}
            />
          )}
          {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
            <ManageAidPackages
              medicalNeeds={medicalNeeds}
              needAssignments={needAssignments}
              setNeedAssignments={setNeedAssignments}
              aidPackages={aidPackages}
              setAidPackages={setAidPackages}
            />
          )}
        </div>

        <div className="bottom-sticky-nav">
          {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
            <button
              className="btn secondary"
              onClick={() => goToStep(STEPS.ASSIGN_SUPPLIERS)}
            >
              Back
            </button>
          )}
          {currentFormStep === STEPS.ASSIGN_SUPPLIERS && (
            <button
              className="btn pull-right"
              onClick={() => goToStep(STEPS.MANAGE_AID_PACKAGES)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </Page>
  );
}
