import {DonorAidPackageOrderItem} from "./DonorAidPackageOrderItem";

export interface DonorAidPackage {
  packageId: number;
  description: string;
  name: string;
  status:DonorAidPackage.Status;
  supplierID: number;
  orderItems: DonorAidPackageOrderItem[];
  totalAmount: number;
  pledgedPercentage: number;
}

export namespace DonorAidPackage {
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
