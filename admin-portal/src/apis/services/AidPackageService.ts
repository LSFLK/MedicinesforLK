import http from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import { AidPackageItem } from "../../types/DonorAidPackageOrderItem";

export class AidPackageService {
  static getAidPackages() {
    return http.get<AidPackage[]>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return http.get<AidPackage>(`aidpackages/${packageID}`);
  }

  static updateAidPackage(aidPackage: AidPackage) {
    return http.patch<AidPackage>(`aidpackages`, aidPackage);
  }

  static getUpdateComments(packageID: number | string) {
    return http.get<AidPackageUpdateComment[]>(
      `aidPackages/${packageID}/updatecomments`
    );
  }

  static upsertUpdateComment(
    packageID: number | string,
    comment: AidPackageUpdateComment
  ) {
    return http.put<AidPackageUpdateComment>(
      `aidPackages/${packageID}/updatecomments`,
      comment
    );
  }

  static deleteUpdateComment(
    packageID: number | string,
    packageUpdateID: number
  ) {
    return http.delete(
      `aidPackages/${packageID}/updatecomment/${packageUpdateID}`
    );
  }

  static updateAidPackageItem(
    packageID: number | string,
    packageItem: AidPackageItem
  ) {
    return http.put<AidPackageItem>(
      `aidpackages/${packageID}/aidpackageitems`,
      packageItem
    );
  }

  static deleteAidPackageItem(
    packageID: number | string,
    packageItemID: number
  ) {
    return http.delete(
      `aidpackages/${packageID}/aidpackageitems/${packageItemID}`
    );
  }
}
