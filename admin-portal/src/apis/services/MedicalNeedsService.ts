import { MedicalNeed } from "types/MedicalNeeds";
import http from "../httpCommon";

export class MedicalNeedsService {
  static getMedicalNeeds() {
    return http.get<MedicalNeed[]>(`/medicalneeds`);
  }
}
