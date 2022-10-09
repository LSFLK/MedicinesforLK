export interface MedicalNeed {
  lastUpdatedDate: number;
  medicalNeeds: Need[];
}

export interface Need {
  needID: number;
  item: MedicalItem;
  period: Period;
  urgency: string;
  neededQuantity: number;
  remainingQuantity: number;
  beneficiary: Beneficiary;
}

export interface Period {
  year: number;
  month: number;
  day: number;
}

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
