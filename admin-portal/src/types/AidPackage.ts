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
    AwaitingPayment = "AwaitingPayment",
    Ordered = "Ordered",
    Shipped = "Shipped",
    ReceivedAtMOH = "ReceivedAtMOH",
    Delivered = "Delivered",
  }
}
