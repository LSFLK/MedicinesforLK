import { MedicalNeed } from "../types/MedicalNeeds";

export function getNeedFromId(medicalNeeds: MedicalNeed[], needID: number) {
  return medicalNeeds.find((need) => needID === need.needID);
}

function getSupplierForNeed(need: MedicalNeed, supplierID: number) {
  return need.supplierQuotes.find(
    (supplier) => supplier.supplierID === supplierID
  );
}

export function getSupplierQuoteForNeed({
  medicalNeeds,
  needID,
  supplierID,
}: {
  medicalNeeds: MedicalNeed[];
  needID: number;
  supplierID: number;
}) {
  const need = getNeedFromId(medicalNeeds, needID);
  if (!need) return null;

  return getSupplierForNeed(need, supplierID);
}
