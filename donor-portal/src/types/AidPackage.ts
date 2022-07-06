import { AidPackageItem } from "./DonorAidPackageOrderItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
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
