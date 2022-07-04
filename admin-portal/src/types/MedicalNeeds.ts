import { Quotation } from "./Quotation";

export type MedicalNeed = {
  needID?: number;
  itemID: number;
  beneficiaryID: number;
  time: any;
  urgency: string;
  neededQuantity: number;
  remainingQuantity: number;
  beneficiary?: Beneficiary;
  supplierQuotes: Array<Quotation>;
  medicalItem: MedicalItem;
};

export type Beneficiary = {
  beneficiaryID?: number;
  name: string;
  shortName: string;
  email: string;
  phoneNumber: string;
};

export type MedicalItem = {
  itemID: number;
  name: string;
  type: string;
  unit: string;
};
