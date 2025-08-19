# SolarShare.lk Authentication Service

This is the Ballerina backend service for SolarShare.lk authentication.

## Setup Instructions

1. **Install Ballerina**: Download and install Ballerina from https://ballerina.io/downloads/

2. **Generate Keystore** (for JWT signing):

   ```bash
   keytool -genkey -alias ballerina -keyalg RSA -keystore resources/keystore.p12 -storetype PKCS12 -keysize 2048
   ```

   Use password: `ballerina` for both keystore and key passwords.

3. **Run the Service**:
   ```bash
   cd backend
   bal run
   ```

The service will start on `http://localhost:8080`

## API Endpoints

### POST /auth/signup

Register a new user account.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+94 77 123 4567",
  "location": "Colombo, Sri Lanka",
  "password": "securepassword",
  "userType": "individual"
}
```

### POST /auth/signin

Sign in with existing credentials.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Demo Credentials:**

- Email: `demo@solarshare.lk`
- Password: `demo123`

### POST /auth/forgot-password

Request password reset instructions.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

### POST /auth/verify

Verify JWT token validity.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

## Features

- JWT-based authentication
- Password hashing with SHA-256
- CORS support for frontend integration
- Comprehensive error handling
- Request validation
- Logging for debugging

## Security Notes

- In production, use proper password hashing (bcrypt, scrypt, etc.)
- Store user data in a secure database
- Use environment variables for sensitive configuration
- Implement rate limiting for authentication endpoints
- Add email verification for new accounts
- Use HTTPS in production
