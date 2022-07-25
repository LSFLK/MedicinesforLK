import { MedicalNeed } from "../../types/MedicalNeeds";
import Http from "../httpCommon";

export default class MedicalNeedsService {
  static http: Http;

  static getMedicalNeeds() {
    return MedicalNeedsService.http.get<MedicalNeed[]>(`medicalneeds`);
  }
}
