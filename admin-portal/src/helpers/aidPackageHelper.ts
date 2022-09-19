import { Quotation } from "../types/Quotation";

export function getDraftAidPackageKey(quote: Quotation) {
  return quote.supplierID;
}

export function getSupplierIdFromAidPackageKey(aidPackageKey: string): number {
  return Number(aidPackageKey);
}
