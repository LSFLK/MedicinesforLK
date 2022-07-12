import { AidPackageItem } from "./DonorAidPackageOrderItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
  goalAmount: number;
  receivedAmount: number;
  totalAmount: number;
  pledgedPercentage: number;
}

export namespace AidPackage {
  export enum Status {
    Draft = "Draft",
    Published = "Published",
    AwaitingPayment = "Awaiting Payment",
    Ordered = "Ordered",
    Shipped = "Shipped",
    ReceivedAtMOH = "Received At MOH",
    Delivered = "Delivered",
  }
}
