import Http, { temporaryClient } from "../httpCommon";

export default class SupplierService {
  static http: Http;

  static postQuotation(quotation: any) {
    return temporaryClient.post<string>(`quotations`, quotation);
  }
}
