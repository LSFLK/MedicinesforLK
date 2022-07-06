import { Supplier } from "./Supplier";

export interface Quotation {
  quotationID: number;
  supplierID: number;
  itemID: number;
  brandName: string;
  availableQuantity: number;
  period: number;
  expiryDate: number;
  regulatoryInfo: string;
  unitPrice: number;
  supplier: Supplier;
}
