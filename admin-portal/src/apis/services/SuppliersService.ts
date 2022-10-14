import Http from "../httpCommon";

export default class SuppliersService {
  static http: Http;

  static postSuppliers(formData: FormData) {
    return SuppliersService.http.post<FormData, string>(`suppliers`, formData);
  }
}
