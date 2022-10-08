import { MedicalNeed } from "../../types/MedicalNeeds";
import { donorHttpClient } from "../httpCommon";

export default class MedicalNeedsService {
  static getMedicalNeeds() {
    return donorHttpClient.get<MedicalNeed>(`medical-needs`);
  }
}
