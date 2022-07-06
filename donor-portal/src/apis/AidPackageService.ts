import { AidPackage } from "../types/AidPackage";
import http from "./httpCommon";

export class AidPackageService {
  static getAidPackages() {
    return http.get<Array<AidPackage>>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return http.get<AidPackage>(`aidpackages/${packageID}`);
  }
}
