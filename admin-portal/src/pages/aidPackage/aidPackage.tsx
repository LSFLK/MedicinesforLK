import { useEffect, useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";
import { AssignSuppliers } from "./assignSuppliers/assignSuppliers";
import { ManageAidPackages } from "./manageAidPackages/manageAidPackages";
import { NeedsInfo } from "data/medical-needs.mock.data";

import toast from "react-simple-toasts";

import "./aidPackage.css";
import { MedicalNeedsService } from "apis/services/MedicalNeedsService";
import { AidPackageService } from "apis/services/AidPackageService";

enum STEPS {
  ASSIGN_SUPPLIERS,
  MANAGE_AID_PACKAGES,
}

export type NeedAssignments = {
  [needID: string]: Map<number, number>; // Map<supplierId: quantity>
};

export type AidPackage = {
  name: string;
  details: string;
  isPublished?: boolean;
};
export type AidPackages = {
  [supplierID: number]: AidPackage;
};

export function CreateAidPackage() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [needAssignments, setNeedAssignments] = useState<NeedAssignments>({});
  const [medicalNeeds, setMedicalNeeds] = useState<Array<NeedsInfo>>([]);
  const [aidPackages, setAidPackages] = useState<AidPackages>({});

  useEffect(() => {
    MedicalNeedsService.getMedicalNeeds().then((response: any) => {
      const needsArray = response.data;
      setMedicalNeeds(needsArray);
      setNeedAssignments(
        needsArray.reduce(
          (previousValue: NeedAssignments, currentValue: any) => {
            previousValue[currentValue.needID] = new Map();
            return previousValue;
          },
          {}
        )
      );
    });
  }, []);

  const goToStep = (step: STEPS) => {
    setCurrentFormStep(step);
  };

  const handleAidPkgPublish = async (supplierID: number): Promise<any> => {
    const aidPackage = aidPackages[supplierID];
    const needs = Object.keys(needAssignments)
      .filter((needID) => {
        return needAssignments[needID].has(supplierID);
      })
      .map((id) => {
        return {
          id: Number(id),
          quantity: needAssignments[id].get(supplierID),
        };
      });

    if (aidPackage) {
      return AidPackageService.postAidPackage({
        name: aidPackage.name,
        description: aidPackage.details,
        aidPackageItems: needs.map((need) => {
          const medicalNeed = medicalNeeds.find(
            (currentNeed) => currentNeed.needID === need.id
          );
          const supplierQuotationID = medicalNeed?.supplierQuotes.find(
            (quote) => quote.supplierID === supplierID
          )?.quotationID;

          return {
            needID: need.id,
            quantity: need.quantity,
            quotationID: supplierQuotationID as number,
          };
        }),
      })
        .then(() => {
          toast(`Successfully Published ${aidPackage.name}`);
          /**
           * flags the package to be removed from
           * table.
           */
          aidPackages[supplierID].isPublished = true;
          setAidPackages({ ...aidPackages });
        })
        .catch((error) => {
          toast("something went wrong");
        });
    } else {
      throw new Error("invalid supplier"); // or handle otherwise.
    }
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
              aidPackages={aidPackages}
            />
          )}
          {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
            <ManageAidPackages
              medicalNeeds={medicalNeeds}
              needAssignments={needAssignments}
              setNeedAssignments={setNeedAssignments}
              aidPackages={aidPackages}
              setAidPackages={setAidPackages}
              handleAidPkgPublish={handleAidPkgPublish}
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
