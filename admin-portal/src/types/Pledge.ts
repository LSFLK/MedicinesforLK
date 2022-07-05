import { Donor } from "./Donor";

export interface Pledge {
  pledgeID: number;
  packageID: number;
  donorID: number;
  amount: number;
  status: Pledge.Status;
  donor: Donor;
}

export namespace Pledge {
  export enum Status {
    Created = "Created",
    PaymentInitiated = "PaymentInitiated",
    PaymentConfirmed = "PaymentConfirmed",
  }
}
