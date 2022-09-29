import Http from "../httpCommon";

export default class QuotationService {
  static http: Http;

  static postQuotation(quotation: FormData) {
    return QuotationService.http.post<FormData, string>(
      `quotations`,
      quotation
    );
  }
}
