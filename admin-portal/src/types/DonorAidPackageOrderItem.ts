import {Quotation} from "./Quotation";

export interface AidPackageItem {
  packageItemID: number;
  packageID: number;
  quotationID: number;
  quantity: number;
  totalAmount: number;
  quotation: Quotation;
}
