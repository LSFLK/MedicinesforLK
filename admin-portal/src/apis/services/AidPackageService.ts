import http from "../httpCommon";
import {AidPackages} from "../../types/AidPackages";
import {AidPackage} from "../../types/AidPackage";
import {AidPackageUpdateComments} from "../../types/AidPackageUpdateComments";

export class AidPackageService {
  static getAidPackages() {
    return http.get<AidPackages>("AidPackages");
  }

  static getAidPackage(packageID: number | string) {
    return http.get<AidPackage>(`AidPackage?packageID=${packageID}`)
  }

  static getUpdateComments(packageID: number | string) {
    return http.get<{ aidPackageUpdateComments: AidPackageUpdateComments[] }>(
      `AidPackage/UpdateComments?packageID=${packageID}`
    )
  }
}
