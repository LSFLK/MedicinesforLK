import Http from "../httpCommon";

export default class SupplierService {
  static http: Http;

  static postQuotation(quotation: FormData) {
    return SupplierService.http.post<FormData, string>(`quotations`, quotation);
  }
}
