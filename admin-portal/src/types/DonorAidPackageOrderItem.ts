import { Quotation } from "./Quotation";

export interface PartialAidPackageItem {

}

export interface AidPackageItem {
  packageItemID: number;
  packageID: number;
  quotationID: number;
  quantity: number;
  totalAmount: number;
  needID: number;
  quotation: Quotation;
}
