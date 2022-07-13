import { adminHttp, donorHttp } from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";

export class AidPackageService {
  static getAidPackages() {
    return adminHttp.get<AidPackage[]>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return adminHttp.get<AidPackage>(`aidpackages/${packageID}`);
  }

  static getPledgedAidPackages(donorId: string) {
    return donorHttp.get<AidPackage[]>(`${donorId}/aidpackages`);
  }

  static getUpdateComments(packageID: number | string) {
    return adminHttp.get<AidPackageUpdateComment[]>(
      `aidpackages/${packageID}/updatecomments`
    );
  }
}
