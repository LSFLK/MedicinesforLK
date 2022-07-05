import { AidPackages } from "../types/AidPackages";
import http from "./httpCommon";

class AdminDataServices {
  getAidPackages() {
    return http.get<AidPackages>("AidPackages");
  }

  getMedicalNeedsInfo() {
    return http.get<AidPackages>("medicalNeedInfo");
  }

  postNeeds(formData: any) {
    return http.post(`requirements`, formData);
  }
}

export default new AdminDataServices();
