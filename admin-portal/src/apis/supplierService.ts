import http from "./httpCommon";
import { Quotation } from "types/Quotation";

export class supplierService {
  static postQuotation(quotation: any) {
    return http.post<Quotation>(`Quotation`, quotation);
  }
}
