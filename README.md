# TaskVault API

a secure REST api built with node.js and express.js, with backend scaffolding and authentication features.

## Description

this project assignment serves as the backend scaffolding for TaskVault. it includes essential security implementations, user authentication with JWT tokens, rate limiting, error handling, and structured logging

## Features

*   **authentication:**
    *   user registration (`/auth/register`) with  bcrypt password hashing
    *   user login (`/auth/login`) with JWT generation (1-hour expiration)
*   **security:**
    *   passwords are never returned in API responses.
    *   protected route (`/user/me`) requiring a valid JWT bearer token
    *   rate limiting on authentication routes (5 requests per minute) to prevent abuse and brute-force attacks
*   **logging:** centralized error handling and request logging using Morgan, outputting to both console and a persisted `logs/app.log` file
*   **environment configuration:** secure management of sensitive variables (like `JWT_SECRET`) using `dotenv`

## tech stack

*   **Node.js & Express.js:** core framework
*   **bcrypt:** for password hashing
*   **jwt:** for stateless authentication
*   **express-rate-limit:** for ddos and brute-force protection on specific routes
*   **morgan:** http request logger middleware
*   **dotenv:** environment variable management

## installation and run instructions

1.  **clone the repo (or navigate to the directory):**
    ```bash
    cd securityscaffolding
    ```

2.  **install dependencies:**
    ```bash
    npm install
    ```

3.  **environment setup:**
    copy the provided `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    then, edit the `.env` file and provide a secure, random string for `JWT_SECRET`.

4.  **start the server:**
    ```bash
    npm start
    ```

## API endpoints

### authentication
*   **`POST /auth/register`**
    *   Body: `{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }`
*   **`POST /auth/login`**
    *   Body: `{ "email": "user@example.com", "password": "yourpassword" }`
    *   Returns: `{ "success": true, "token": "..." }`

### User Profile
*   **`GET /user/me`**
    *   Headers: `Authorization: Bearer <your_jwt_token>`
    *   Returns: The logged-in user's profile details without the hashed password.
