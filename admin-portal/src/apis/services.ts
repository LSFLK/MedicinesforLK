import http from "./httpCommon";
import { HttpRequestConfig } from "@asgardeo/auth-react";

/**
 * @Deprecated No Longer Needed
 */
class AdminDataServices {
    // getAidPackages() {
    //     return http.get<AidPackages>("AidPackages");
    // }

    // getMedicalNeedsInfo() {
    //     return http.get<AidPackages>("medicalNeedInfo");
    // }

    getAidPackages() {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "GET",
            url: "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/0.1.0/AidPackages"
        };
        return http?.httpRequest(config);
    }

    getMedicalNeedsInfo() {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "GET",
            url: "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/0.1.0/medicalNeedInfo"
        };
        return http?.httpRequest(config);
    }
}

export default new AdminDataServices();
