import { Quotation } from "../types/Quotation";

export function getDraftAidPackageKey(quote: Quotation) {
  return `${quote.supplierID}#${quote.period.year}-${quote.period.month}-${quote.period.day}`;
}

export function getSupplierIdFromAidPackageKey(aidPackageKey: string): number {
  return Number(aidPackageKey.split("#")[0]);
}

export function getPeriodFromAidPackageKey(
  aidPackageKey: string
): Quotation["period"] {
  const periodValues = aidPackageKey.split("#")[1].split("-").map(Number);
  return {
    year: periodValues[0],
    month: periodValues[1],
    day: periodValues[2],
  };
}
