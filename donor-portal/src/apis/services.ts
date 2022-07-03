
import { AidPackage } from "../types/AidPackage";
import instance from "./httpCommon";

export class DonorServices {
    static getAidPackages() {
        return instance.get<AidPackage[]>("aidpackages");
    }
}
