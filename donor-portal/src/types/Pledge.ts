import { Donor } from "./Donor";

export interface Pledge {
  pledgeID: number;
  packageID: number;
  donorID: string;
  amount: number;
  status: Pledge.Status;
  donor: Donor | null;
}

export namespace Pledge {
  export enum Status {
    Pledged = "Pledged",
    PaymentInitiated = "Payment Initiated",
    PaymentConfirmed = "Payment Confirmed",
  }
}
