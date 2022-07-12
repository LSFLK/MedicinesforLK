import Http, {temporaryClient} from "../httpCommon";

export class SupplierService {
  static http: Http;

  static postQuotation(quotation: any) {
    return temporaryClient.post<string>(
      `quotations`,
      quotation
    );
  }
}
