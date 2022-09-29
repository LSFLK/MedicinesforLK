import Http from "../httpCommon";

export default class SuppliersService {
  static http: Http;

  static postSuppliers(suppliers: FormData) {
    return SuppliersService.http.post<FormData, string>(`suppliers`, suppliers);
  }
}
