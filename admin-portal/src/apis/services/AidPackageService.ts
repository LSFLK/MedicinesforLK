import Http from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import { AidPackageItem } from "../../types/DonorAidPackageOrderItem";
import { Pledge } from "../../types/Pledge";

export class AidPackageService {
  static http: Http;

  static getAidPackages() {
    return AidPackageService.http.get<AidPackage[]>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return AidPackageService.http.get<AidPackage>(`aidpackages/${packageID}`);
  }

  static updateAidPackage(aidPackage: AidPackage) {
    return AidPackageService.http.patch<AidPackage, AidPackage>(
      `aidpackages`,
      aidPackage
    );
  }

  static getUpdateComments(packageID: number | string) {
    return AidPackageService.http.get<AidPackageUpdateComment[]>(
      `aidpackages/${packageID}/updatecomments`
    );
  }

  static upsertUpdateComment(
    packageID: number | string,
    comment: AidPackageUpdateComment
  ) {
    return AidPackageService.http.put<
      AidPackageUpdateComment,
      AidPackageUpdateComment
    >(`aidpackages/${packageID}/updatecomments`, comment);
  }

  static deleteUpdateComment(
    packageID: number | string,
    packageUpdateID: number
  ) {
    return AidPackageService.http.delete(
      `aidpackages/${packageID}/updatecomment/${packageUpdateID}`
    );
  }

  static updateAidPackageItem(
    packageID: number | string,
    packageItem: AidPackageItem
  ) {
    return AidPackageService.http.put<AidPackageItem, AidPackageItem>(
      `aidpackages/${packageID}/aidpackageitems`,
      packageItem
    );
  }

  static deleteAidPackageItem(
    packageID: number | string,
    packageItemID: number
  ) {
    return AidPackageService.http.delete(
      `aidpackages/${packageID}/aidpackageitems/${packageItemID}`
    );
  }

  static getPledges(packageID: number | string) {
    return AidPackageService.http.get<Pledge[]>(
      `aidpackage/${packageID}/pledges`
    );
  }

  static postNeeds(formData: any) {
    return AidPackageService.http.post<any, string>(
      `requirements/medicalneeds`,
      formData
    );
  }

  static postAidPackage({
    name,
    description,
    aidPackageItems,
  }: {
    name: string;
    description: string;
    aidPackageItems: Array<{
      needID: number;
      quantity?: number;
      quotationID: number;
    }>;
  }) {
    // TODO:  Define interfaces for the data types.
    return AidPackageService.http.post<any, any>(`aidpackages`, {
      name,
      description,
      aidPackageItems,
    });
  }
}
