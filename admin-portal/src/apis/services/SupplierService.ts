import { Quotation } from "types/Quotation";
import Http from "../httpCommon";

export class SupplierService {
  static http: Http;

  static postQuotation(quotation: any) {
    return SupplierService.http.post<Quotation, string>(
      `quotations`,
      quotation
    );
  }
}
