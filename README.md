# TaskVault API

A secure RESTful API built with Node.js and Express.js, providing robust backend scaffolding and authentication features.

## Description

This project serves as the backend scaffolding for TaskVault, demonstrating a Clean Architecture approach. It includes essential security implementations, user authentication with JSON Web Tokens (JWT), rate limiting, error handling, and structured logging.

## Features

*   **Clean Architecture:** Organized directory layout (controllers, routes, middleware, models, services).
*   **Authentication:**
    *   User registration (`/auth/register`) with secure bcrypt password hashing.
    *   User login (`/auth/login`) with JWT generation (1-hour expiration).
*   **Security:**
    *   Passwords are never returned in API responses.
    *   Protected route (`/user/me`) requiring a valid JWT Bearer token.
    *   Rate limiting on authentication routes (5 requests per minute) to prevent abuse and brute-force attacks.
*   **Logging:** Centralized error handling and request logging using Morgan, outputting to both console and a persisted `logs/app.log` file.
*   **Environment Configuration:** Secure management of sensitive variables (like `JWT_SECRET`) using `dotenv`.

## Tech Stack

*   **Node.js & Express.js:** Core framework.
*   **bcrypt:** For password hashing.
*   **jsonwebtoken (JWT):** For stateless authentication.
*   **express-rate-limit:** For DDoS and brute-force protection on specific routes.
*   **morgan:** HTTP request logger middleware.
*   **dotenv:** Environment variable management.

## Installation and Run Instructions

1.  **Clone the Repository (or navigate to the directory):**
    ```bash
    cd securityscaffolding
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy the provided `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    Then, edit the `.env` file and provide a secure, random string for `JWT_SECRET`.

4.  **Start the Server:**
    ```bash
    npm start
    ```
    *Note: By default, the app runs on `node server.js` as defined in `package.json` (you may add `"start": "node server.js"` to your scripts).*

## API Endpoints

### Authentication
*   **`POST /auth/register`**
    *   Body: `{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }`
*   **`POST /auth/login`**
    *   Body: `{ "email": "user@example.com", "password": "yourpassword" }`
    *   Returns: `{ "success": true, "token": "..." }`

### User Profile
*   **`GET /user/me`**
    *   Headers: `Authorization: Bearer <your_jwt_token>`
    *   Returns: The logged-in user's profile details without the hashed password.
