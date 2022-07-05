export interface Pledge {
  aidPackageID: number;
  donorID: number;
  amount: number;
  status: Pledge.Status;
}

export namespace Pledge {
  export enum Status {
    Created = "Created",
    PaymentInitiated = "PaymentInitiated",
    PaymentConfirmed = "PaymentConfirmed",
  }
}
