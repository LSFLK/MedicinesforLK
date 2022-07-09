/**
 * helper functions associated with Aid Packages.
 * mock data.
 */

export type NeedsInfo = {
  name: string;
  needID: number;
  period: {
    year: number;
    month: number;
    day: number;
  };
  urgency: string;
  neededQuantity: number;
  remainingQuantity: number;
  supplierQuotes: Array<SupplierQuote>;
  beneficiary: {
    beneficiaryID: number;
    name: string;
    shortName: string;
    email: string;
    phoneNumber: string;
  };
};

export type SupplierQuote = {
  quotationID: number;
  supplierID: number;
  brandName: string;
  availableQuantity: number;
  expiryDate: {
    year: number;
    month: number;
    day: number;
  };
  unitPrice: number;
  regulatoryInfo: string;
  supplier: {
    supplierID: number;
    name: string;
    shortName: string;
    email: string;
    phoneNumber: string;
  };
};

/**
 * fetches currently pending medical needs.
 * @returns NeedsInfo
 */
export function fetchMedicalNeeds(): Promise<{
  medicalNeedInfo: Array<NeedsInfo>;
}> {
  return new Promise((res) => {
    res({
      medicalNeedInfo: [
        {
          name: "Paracetamol",
          needID: 1,
          period: {
            year: 2020,
            month: 6,
            day: 1,
          },
          urgency: "Critical",
          neededQuantity: 111000,
          remainingQuantity: 110000,
          supplierQuotes: [
            {
              quotationID: 1,
              supplierID: 1,
              brandName: "brandName",
              availableQuantity: 10000,
              expiryDate: {
                year: 2022,
                month: 8,
                day: 1,
              },
              unitPrice: 1000.56,
              regulatoryInfo: "regulatoryInfo",
              supplier: {
                supplierID: 1,
                name: "Pharma Co.",
                shortName: "shortName",
                email: "email@gmail.com",
                phoneNumber: "phoneNumber",
              },
            },
          ],
          beneficiary: {
            beneficiaryID: 1,
            name: "name",
            shortName: "shortname",
            email: "email",
            phoneNumber: "phone",
          },
        },
        {
          name: "name",
          needID: 2,
          period: {
            year: 2022,
            month: 7,
            day: 1,
          },
          urgency: "Critical",
          neededQuantity: 10000,
          remainingQuantity: 10000,
          supplierQuotes: [
            {
              quotationID: 1,
              supplierID: 1,
              brandName: "brandName",
              availableQuantity: 5000,
              expiryDate: {
                year: 2022,
                month: 8,
                day: 1,
              },
              unitPrice: 1000.56,
              regulatoryInfo: "regulatoryInfo",
              supplier: {
                supplierID: 1,
                name: "Pharma Co.",
                shortName: "shortName",
                email: "email@gmail.com",
                phoneNumber: "phoneNumber",
              },
            },
            {
              quotationID: 1,
              supplierID: 2,
              brandName: "brandName",
              availableQuantity: 10000,
              expiryDate: {
                year: 2022,
                month: 8,
                day: 1,
              },
              unitPrice: 1000.56,
              regulatoryInfo: "regulatoryInfo",
              supplier: {
                supplierID: 2,
                name: "ACME Inc.",
                shortName: "shortName",
                email: "email@gmail.com",
                phoneNumber: "phoneNumber",
              },
            },
          ],
          beneficiary: {
            beneficiaryID: 1,
            name: "name",
            shortName: "shortname",
            email: "email",
            phoneNumber: "phone",
          },
        },
      ],
    });
  });
}
