import ballerina/http;
import ballerinax/mysql;
import ballerina/sql;

public type aidpkg record {
    string package_id;
    string name;
    string description;
    aidpkg_status status;
};

public enum aidpkg_status {
    Unfunded,
    Partially\ Funded,
    Fully\ Funded,
    Awaiting\ Payment,
    Ordered,
    Shipped,
    Received\ MoH,
    Delivery\ InProgess,
    Delivered
}

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {
    
    # A resource for generating AidPackage
    # + return - AidPackage or error
    resource function put aidpkg(@http:Payload json payload) returns  json|http:Unauthorized|http:BadRequest|error {
        aidpkg 'aidpkg = check payload.fromJsonWithType();
        mysql:Client|sql:Error dbClient = new (dbHost, dbUser, dbPass, db, dbPort);
        if dbClient is mysql:Client {
            sql:ParameterizedQuery query = `INSERT INTO AID_PACKAGE(PACKAGE_ID, NAME, DESCRIPTION, STATUS)
                                            VALUES (${'aidpkg.package_id}, ${'aidpkg.name}, ${'aidpkg.description}, ${'aidpkg.status})
                                            ON DUPLICATE KEY
                                            UPDATE NAME=${'aidpkg.name}, DESCRIPTION=${'aidpkg.description}, STATUS='${'aidpkg.status};`;
            _ = check dbClient->execute(query);
            error? e = dbClient.close();
            if e is error {
                return -1;
            }
        }
        return 'aidpkg.toJson();
    }
}
