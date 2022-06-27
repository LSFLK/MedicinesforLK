import http from "../httpCommon";
import {AidPackage} from "../../types/AidPackage";
import {AidPackageUpdateComment} from "../../types/AidPackageUpdateComment";
import {AidPackageItem} from "../../types/DonorAidPackageOrderItem";

export class AidPackageService {
  static getAidPackages() {
    return http.get<AidPackage[]>("AidPackages");
  }

  static getAidPackage(packageID: number | string) {
    return http.get<AidPackage>(`AidPackage?packageID=${packageID}`)
  }

  static updateAidPackage(aidPackage: AidPackage) {
    return http.patch<AidPackage>(
      `AidPackage`,
      aidPackage)
  }

  static getUpdateComments(packageID: number | string) {
    return http.get<AidPackageUpdateComment[]>(
      `AidPackage/UpdateComments?packageID=${packageID}`
    )
  }

  static updateUpdateComment(packageID: number | string, comment: AidPackageUpdateComment) {
    return http.put<AidPackageUpdateComment>(
      `AidPackage/${packageID}/UpdateComment`,
      comment
    )
  }

  static updateAidPackageItem(packageID: number | string, packageItem: AidPackageItem) {
    return http.put<AidPackageItem>(
      `AidPackage/${packageID}/AidPackageItem`,
      packageItem
    )
  }
}
