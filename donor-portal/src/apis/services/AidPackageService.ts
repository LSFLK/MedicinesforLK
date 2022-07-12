import http from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";

export class AidPackageService {
  static getAidPackages() {
    return http.get<AidPackage[]>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return http.get<AidPackage>(`aidpackages/${packageID}`);
  }
}
