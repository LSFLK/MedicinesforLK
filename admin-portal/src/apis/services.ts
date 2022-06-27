import { AidPackages } from "../types/AidPackages";
import http from "./httpCommon";

class AdminDataServices {
    getAidPackages() {
        return http.get<AidPackages>("AidPackages");
    }
}

export default new AdminDataServices();
