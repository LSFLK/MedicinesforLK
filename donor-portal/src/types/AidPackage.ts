import {AidPackageItem} from "./AidPackageItem";

export interface AidPackage {
  packageID: number;
  name: string;
  description: string;
  status: AidPackage.Status;
  aidPackageItems: AidPackageItem[];
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