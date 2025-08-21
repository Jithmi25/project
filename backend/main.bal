import ballerina/crypto;
import ballerina/http;
import ballerina/uuid;
import ballerinax/mongodb;

// Configurables
configurable string mongoUri = "mongodb+srv://Jithmi:1234@cluster0.jkzmlfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB client
mongodb:ConnectionConfig connectionConfig = {
    connection: mongoUri
};
mongodb:Client mongoDb = check new (connectionConfig);

// Listeners
listener http:Listener authListener = new (9090);
listener http:Listener passwordListener = new (9095);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173", "http://localhost:3000"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"]
    }
}
service /api on authListener {
    private final mongodb:Database userDb;

    function init() returns error? {
        self.userDb = check mongoDb->getDatabase("userDb");
    }

    resource function post signup(UserInput req) returns http:Response|error {
        mongodb:Collection users = check self.userDb->getCollection("users");

        // Validate password length
        if req.password.length() < 8 {
            return createErrorResponse("Password must be at least 8 characters.");
        }

        // Check for duplicate username or email
        stream<User, error?> dup = check users->find({
            "$or": [{username: req.username}, {email: req.email}]
        });
        User[] dupArr = check from User u in dup
            select u;

        if dupArr.length() > 0 {
            return createErrorResponse("Username or email already exists.");
        }

        // Hash password and create user
        string hashed = crypto:hashSha256(req.password.toBytes()).toBase16();
        User newUser = {
            id: uuid:createType4AsString(),
            username: req.username,
            password: hashed,
            email: req.email ?: "",
            resetToken: ()
        };

        check users->insertOne(newUser);
        return jsonMsg("Signup successful. Please proceed to login.");
    }

    resource function post login(LoginInput req) returns http:Response|error {
        mongodb:Collection users = check self.userDb->getCollection("users");

        // Hash the provided password
        string hashed = crypto:hashSha256(req.password.toBytes()).toBase16();

        // Find user with matching username and password
        stream<User, error?> rs = check users->find({
            username: req.username,
            password: hashed
        });
        User[] hits = check from User u in rs
            select u;

        if hits.length() == 0 {
            return createErrorResponse("Invalid username or password.");
        }

        return jsonMsg("Login successful!");
    }

    resource function get profile(http:Caller caller, http:Request req) returns error? {
        // Since JWT is removed, just return a generic message
        check caller->respond({message: "Profile access currently not secured by token."});
    }
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173", "http://localhost:3000"],
        allowMethods: ["POST", "OPTIONS"],
        allowHeaders: ["Content-Type"]
    }
}
service /api on passwordListener {
    private final mongodb:Database userDb;

    function init() returns error? {
        self.userDb = check mongoDb->getDatabase("userDb");
    }

    resource function post forgot(ResetRequest req) returns http:Response|error {
        mongodb:Collection users = check self.userDb->getCollection("users");

        // Find user by username and email
        stream<User, error?> s = check users->find({
            username: req.username,
            email: req.email
        });
        User[] found = check from User u in s
            select u;

        if found.length() == 0 {
            return createErrorResponse("User not found.");
        }

        // Generate reset token
        string token = uuid:createType4AsString();
        mongodb:Update updateDoc = {
            "$set": {
                "resetToken": token
            }
        };

        _ = check users->updateOne({"username": req.username}, updateDoc);
        return jsonMsg("Password reset token generated. Token: " + token);
    }

    resource function post reset(ResetInput req) returns http:Response|error {
        mongodb:Collection users = check self.userDb->getCollection("users");

        // Find user by reset token
        stream<User, error?> s = check users->find({
            resetToken: req.token
        });
        User[] hits = check from User u in s
            select u;

        if hits.length() == 0 {
            return createErrorResponse("Invalid or expired token.");
        }

        // Validate new password
        if req.newPassword.length() < 8 {
            return createErrorResponse("Password must be at least 8 characters.");
        }

        // Update password and remove reset token
        string hashed = crypto:hashSha256(req.newPassword.toBytes()).toBase16();
        mongodb:Update updateDoc = {
            "$set": {"password": hashed},
            "$unset": {"resetToken": ""}
        };

        _ = check users->updateOne({"resetToken": req.token}, updateDoc);
        return jsonMsg("Password reset successful.");
    }
}

// Helper functions
function jsonMsg(string m) returns http:Response {
    http:Response r = new;
    r.setPayload({message: m});
    return r;
}

function createErrorResponse(string message) returns http:Response {
    http:Response r = new;
    r.statusCode = 400;
    r.setPayload({message: message});
    return r;
}

// Data models
type User record {|
    string id;
    string username;
    string password;
    string email;
    string? resetToken;
|};

type UserInput record {|
    string username;
    string password;
    string email?;
|};

type LoginInput record {|
    string username;
    string password;
|};

type ResetRequest record {|
    string username;
    string email;
|};

type ResetInput record {|
    string token;
    string newPassword;
|};
