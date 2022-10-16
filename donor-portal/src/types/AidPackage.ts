import { AidPackageItem } from "./DonorAidPackageOrderItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  createdBy: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
  goalAmount: number;
  receivedAmount: number;
  thumbnail?: string;
}

export namespace AidPackage {
  export enum Status {
    Draft = "Draft",
    Published = "Published",
    AwaitingPayment = "Awaiting Payment",
    Ordered = "Ordered",
    Shipped = "Shipped",
    ReceivedAtMoH = "Received at MoH",
    Delivered = "Delivered",
  }
}
