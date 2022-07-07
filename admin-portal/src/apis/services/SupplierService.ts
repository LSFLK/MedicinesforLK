import http from "../httpCommon";
import { Quotation } from "types/Quotation";

export class SupplierService {
  static postQuotation(quotation: any) {
    return http.post<Quotation>(`quotations`, quotation);
  }
}
