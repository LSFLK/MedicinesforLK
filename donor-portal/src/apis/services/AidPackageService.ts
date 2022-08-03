import Http, { adminHttp, donorHttp } from "../httpCommon";
import { AidPackage } from "../../types/AidPackage";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import { Pledge } from "../../types/Pledge";

export default class AidPackageService {
  static donorHttp: Http;

  static getAidPackages() {
    return donorHttp.get<AidPackage[]>("aidpackages");
  }

  static getAidPackage(packageID: number | string) {
    return adminHttp.get<AidPackage>(`aidpackages/${packageID}`);
  }

  static getPledgedAidPackages(donorId: string) {
    return donorHttp.get<AidPackage[]>(`${donorId}/aidpackages`);
  }

  static getUpdateComments(packageID: number | string) {
    return donorHttp.get<AidPackageUpdateComment[]>(
      `aidpackages/${packageID}/updatecomments`
    );
  }

  static getDonorPledgesByAidPackage(donorId: string, packageId: string) {
    return donorHttp.get<Pledge[]>(
      `${donorId}/aidpackages/${packageId}/pledges`
    );
  }

  static postPledge(donorId: string, packageId: string, pledge: Pledge) {
    return AidPackageService.donorHttp.post<Pledge, Pledge>(
      `${donorId}/aidpackages/${packageId}/pledge`,
      pledge
    );
  }

  static updatePledge(
    donorId: string,
    packageId: string,
    pledgeID: number,
    updatedPledge: Pledge
  ) {
    return AidPackageService.donorHttp.put<Pledge, Pledge>(
      `${donorId}/aidpackages/${packageId}/pledges/${pledgeID}`,
      updatedPledge
    );
  }
}
