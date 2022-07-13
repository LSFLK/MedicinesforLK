import { adminHttp, donorHttp } from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import { Pledge } from "../../types/Pledge";

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

  static getDonorPledgesByAidPackage(donorId: string, packageId: string) {
    return donorHttp.get<Pledge[]>(
      `${donorId}/aidpackages/${packageId}/pledges`
    );
  }

  static postPledge(donorId: string, packageId: string, pledge: Pledge) {
    return donorHttp.post(`${donorId}/aidpackages/${packageId}/pledge`, pledge);
  }

  static updatePledge(
    donorId: string,
    packageId: string,
    pledgeID: number,
    updatedPledge: Pledge
  ) {
    return donorHttp.put(
      `${donorId}/aidpackages/${packageId}/pledges/${pledgeID}`,
      updatedPledge
    );
  }
}
