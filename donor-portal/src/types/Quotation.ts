import { Supplier } from "./Supplier";

export interface Quotation {
  quotationID: number;
  supplierID: number;
  itemID: number;
  brandName: string;
  availableQuantity: number;
  expiryDate: {
    year: number;
    month: number;
    day: number;
  };
  period: {
    year: number;
    month: number;
    day: number;
  };
  regulatoryInfo: string;
  unitPrice: number;
  supplier: Supplier;
}
