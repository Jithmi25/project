import ballerina/crypto;
import ballerina/http;
import ballerina/jwt;
import ballerina/log;
import ballerina/time;

// CORS configuration
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173", "http://localhost:3000"],
        allowCredentials: false,
        allowHeaders: ["CORELATION_ID", "Authorization", "Content-Type"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
}

service /auth on new http:Listener(8080) {

    // Sign Up endpoint
    resource function post signup(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();

        if (payload is error) {
            json response = {
                "success": false,
                "message": "Invalid request payload"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        json requestData = <json>payload;

        // Extract user data
        string fullName = requestData.fullName.toString();
        string email = requestData.email.toString();
        string phone = requestData.phone.toString();
        string location = requestData.location.toString();
        string password = requestData.password.toString();
        string userType = requestData.userType.toString();

        // Validate required fields
        if (fullName == "" || email == "" || password == "") {
            json response = {
                "success": false,
                "message": "Full name, email, and password are required"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        // Hash password (in production, use proper password hashing)
        string hashedPassword = crypto:hashSha256(password.toBytes()).toBase16();

        // Generate JWT token
        jwt:IssuerConfig issuerConfig = {
            username: email,
            issuer: "solarshare.lk",
            audience: ["solarshare-users"],
            expTime: time:utcNow()[0] + 86400, // 24 hours
            signatureConfig: {
                config: {
                    keyStore: {
                        path: "resources/keystore.p12",
                        password: "ballerina"
                    },
                    keyAlias: "ballerina",
                    keyPassword: "ballerina"
                }
            }
        };

        string|jwt:Error jwtToken = jwt:issue(issuerConfig);

        if (jwtToken is jwt:Error) {
            log:printError("JWT generation failed", jwtToken);
            json response = {
                "success": false,
                "message": "Token generation failed"
            };
            check caller->respond(response, statusCode = 500);
            return;
        }

        // Create user object
        json user = {
            "id": generateUserId(),
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "location": location,
            "userType": userType,
            "createdAt": time:utcNow()[0],
            "isActive": true
        };

        // Success response
        json response = {
            "success": true,
            "message": "Account created successfully",
            "token": jwtToken,
            "user": user
        };

        check caller->respond(response);
        log:printInfo("New user registered: " + email);
    }

    // Sign In endpoint
    resource function post signin(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();

        if (payload is error) {
            json response = {
                "success": false,
                "message": "Invalid request payload"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        json requestData = <json>payload;
        string email = requestData.email.toString();
        string password = requestData.password.toString();

        // Validate credentials (in production, check against database)
        if (email == "" || password == "") {
            json response = {
                "success": false,
                "message": "Email and password are required"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        // Mock user validation (replace with database lookup)
        if (email == "demo@solarshare.lk" && password == "demo123") {
            // Generate JWT token
            jwt:IssuerConfig issuerConfig = {
                username: email,
                issuer: "solarshare.lk",
                audience: ["solarshare-users"],
                expTime: time:utcNow()[0] + 86400, // 24 hours
                signatureConfig: {
                    config: {
                        keyStore: {
                            path: "resources/keystore.p12",
                            password: "ballerina"
                        },
                        keyAlias: "ballerina",
                        keyPassword: "ballerina"
                    }
                }
            };

            string|jwt:Error jwtToken = jwt:issue(issuerConfig);

            if (jwtToken is jwt:Error) {
                log:printError("JWT generation failed", jwtToken);
                json response = {
                    "success": false,
                    "message": "Authentication failed"
                };
                check caller->respond(response, statusCode = 500);
                return;
            }

            json user = {
                "id": "USER001",
                "fullName": "Kasun Perera",
                "email": email,
                "phone": "+94 77 123 4567",
                "location": "Kandy, Sri Lanka",
                "userType": "individual",
                "isActive": true
            };

            json response = {
                "success": true,
                "message": "Sign in successful",
                "token": jwtToken,
                "user": user
            };

            check caller->respond(response);
            log:printInfo("User signed in: " + email);
        } else {
            json response = {
                "success": false,
                "message": "Invalid email or password"
            };
            check caller->respond(response, statusCode = 401);
        }
    }

    // Forgot Password endpoint
    resource function post 'forgot\-password(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();

        if (payload is error) {
            json response = {
                "success": false,
                "message": "Invalid request payload"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        json requestData = <json>payload;
        string email = requestData.email.toString();

        if (email == "") {
            json response = {
                "success": false,
                "message": "Email is required"
            };
            check caller->respond(response, statusCode = 400);
            return;
        }

        // Mock password reset (in production, send actual email)
        log:printInfo("Password reset requested for: " + email);

        json response = {
            "success": true,
            "message": "Password reset instructions have been sent to your email"
        };

        check caller->respond(response);
    }

    // Verify Token endpoint
    resource function post verify(http:Caller caller, http:Request req) returns error? {
        string|http:HeaderNotFoundError authHeader = req.getHeader("Authorization");

        if (authHeader is http:HeaderNotFoundError) {
            json response = {
                "success": false,
                "message": "Authorization header missing"
            };
            check caller->respond(response, statusCode = 401);
            return;
        }

        string token = authHeader.substring(7); // Remove "Bearer " prefix

        jwt:ValidatorConfig validatorConfig = {
            issuer: "solarshare.lk",
            audience: ["solarshare-users"],
            signatureConfig: {
                trustStoreConfig: {
                    trustStore: {
                        path: "resources/keystore.p12",
                        password: "ballerina"
                    },
                    certAlias: "ballerina"
                }
            }
        };

        jwt:Payload|jwt:Error result = jwt:validate(token, validatorConfig);

        if (result is jwt:Error) {
            json response = {
                "success": false,
                "message": "Invalid or expired token"
            };
            check caller->respond(response, statusCode = 401);
            return;
        }

        json response = {
            "success": true,
            "message": "Token is valid",
            "payload": result
        };

        check caller->respond(response);
    }
}

// Helper function to generate user ID
function generateUserId() returns string {
    int timestamp = time:utcNow()[0];
    return "USER" + timestamp.toString();
}
