export interface AidPackageItem {
  orderItemId: number;
  medicalItemName: string;
  quantity: number;
}

export interface AidPackage {
  packageId: number;
  name: string;
  description: string;
  supplierId: number;
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
