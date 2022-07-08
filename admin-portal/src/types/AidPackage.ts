import {AidPackageItem} from "./DonorAidPackageOrderItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
}

export interface DonorAidPackage {
  packageId: number;
  description: string;
  name: string;
  status:AidPackage.Status;
  supplierID: number;
  orderItems: AidPackageItem[];
  totalAmount: number;
  pledgedPercentage: number;
}

export namespace AidPackage {
  export enum Status {
    Draft="Draft",
    Published="Published",
    AwaitingPayment="AwaitingPayment",
    Ordered= "Ordered",
    Shipped = "Shipped",
    ReceivedAtMOH = "ReceivedAtMOH",
    Delivered = "Delivered",
  }
}
