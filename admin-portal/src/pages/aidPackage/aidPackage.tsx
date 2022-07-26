import React, { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Stepper, Step } from "../../components/stepper";
import MedicalNeedsService from "../../apis/services/MedicalNeedsService";
import AidPackageService from "../../apis/services/AidPackageService";
import {
  AidPackage,
  DraftAidPackages,
  NeedAssignments,
} from "../../types/AidPackage";
import { MedicalNeed } from "../../types/MedicalNeeds";
import ManageAidPackages from "./manageAidPackages/manageAidPackages";
import AssignSuppliers from "./assignSuppliers/assignSuppliers";
import "./aidPackage.css";

enum STEPS {
  ASSIGN_SUPPLIERS,
  MANAGE_AID_PACKAGES,
}

export default function CreateAidPackage() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [needAssignments, setNeedAssignments] = useState<NeedAssignments>({});
  const [medicalNeeds, setMedicalNeeds] = useState<MedicalNeed[]>([]);
  const [aidPackages, setAidPackages] = useState<DraftAidPackages>({});
  const [isValidAssignment, setIsValidAssignment] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    MedicalNeedsService.getMedicalNeeds()
      .then((response) => {
        const needsArray = response.data;
        setMedicalNeeds(needsArray);
        setNeedAssignments(
          needsArray.reduce(
            (previousValue: NeedAssignments, currentValue: any) => {
              // eslint-disable-next-line no-param-reassign
              previousValue[currentValue.needID] = new Map();
              return previousValue;
            },
            {}
          )
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goToStep = (step: STEPS) => {
    setCurrentFormStep(step);
  };

  const handleAidPkgPublish = async (
    supplierID: number,
    packageKey: string,
    status: AidPackage.Status = AidPackage.Status.Draft
  ): Promise<any> => {
    const aidPackage = aidPackages[packageKey];
    const needs = Object.keys(needAssignments)
      .map(Number)
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
        status,
        period: aidPackage.period,
        aidPackageItems: needs.map((need) => {
          const medicalNeed = medicalNeeds.find(
            (currentNeed) => currentNeed.needID === need.id
          );
          const supplierQuotationID = medicalNeed?.supplierQuotes.find(
            (quote) => quote.supplierID === supplierID
          )?.quotationID;

          return {
            needID: need.id,
            quantity: need.quantity || 0,
            quotationID: supplierQuotationID as number,
          };
        }),
      })
        .then(({ data }) => {
          toast(`Successfully Published ${aidPackage.name}`);
          /**
           * flags the package to be removed from
           * table.
           */
          aidPackages[packageKey].isPublished = true;
          setAidPackages({ ...aidPackages });
          AidPackageService.commentPublishedAidPackage(data);
        })
        .catch(() => {
          toast("something went wrong");
        });
    }
    throw new Error("invalid supplier"); // or handle otherwise.
  };

  return (
    <div className="create-aid-container">
      <h1>Create an Aid Package</h1>
      <Stepper activeStep={currentFormStep} disabled={!isValidAssignment}>
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
        {isLoading ? (
          <p>Loading Aid Packages...</p>
        ) : (
          <>
            {currentFormStep === STEPS.ASSIGN_SUPPLIERS && (
              <AssignSuppliers
                medicalNeeds={medicalNeeds}
                needAssignments={needAssignments}
                setNeedAssignments={setNeedAssignments}
                aidPackages={aidPackages}
                setIsValidAssignment={setIsValidAssignment}
              />
            )}
            {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
              <ManageAidPackages
                medicalNeeds={medicalNeeds}
                needAssignments={needAssignments}
                aidPackages={aidPackages}
                setAidPackages={setAidPackages}
                handleAidPkgPublish={handleAidPkgPublish}
              />
            )}
          </>
        )}
      </div>

      <div className="bottom-sticky-nav">
        {currentFormStep === STEPS.MANAGE_AID_PACKAGES && (
          <button
            type="button"
            className="btn secondary"
            onClick={() => goToStep(STEPS.ASSIGN_SUPPLIERS)}
          >
            Back
          </button>
        )}
        {currentFormStep === STEPS.ASSIGN_SUPPLIERS && (
          <button
            type="button"
            className="btn pull-right"
            onClick={() => goToStep(STEPS.MANAGE_AID_PACKAGES)}
            disabled={!isValidAssignment}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
