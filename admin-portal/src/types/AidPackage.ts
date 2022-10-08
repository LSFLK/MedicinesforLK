import { AidPackageItem } from "./DonorAidPackageOrderItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
  goalAmount: number;
  receivedAmount: number;
  dateTime: number;
  thumbnail?: string;
}

export namespace AidPackage {
  export enum Status {
    Draft = "Draft",
    Published = "Published",
    AwaitingPayment = "Awaiting Payment",
    Ordered = "Ordered",
    Shipped = "Shipped",
    ReceivedAtMOH = "Received at MoH",
    Delivered = "Delivered",
  }
}

export type NeedAssignment = Map<number, number | null>; // Map<supplierId: quantity>

export type NeedAssignments = {
  [needID: string]: NeedAssignment;
};

export type DraftAidPackage = {
  supplierID: number;
  name: string;
  details: string;
  isPublished?: boolean;
};
export type DraftAidPackages = {
  [key: string]: DraftAidPackage;
};
