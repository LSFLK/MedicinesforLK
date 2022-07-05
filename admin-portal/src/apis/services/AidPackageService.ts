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
      `aidpackages/${packageID}/updatecomments`
    );
  }

  static upsertUpdateComment(
    packageID: number | string,
    comment: AidPackageUpdateComment
  ) {
    return http.put<AidPackageUpdateComment>(
      `aidpackages/${packageID}/updatecomments`,
      comment
    );
  }

  static deleteUpdateComment(
    packageID: number | string,
    packageUpdateCommentID: number
  ) {
    return http.delete(
      `aidpackages/${packageID}/updatecomment/${packageUpdateCommentID}`
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
