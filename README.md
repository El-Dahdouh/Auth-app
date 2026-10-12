# Node.js Authentication API

A RESTful authentication API built with **Node.js, Express.js, and MongoDB**. It provides user registration, login, JWT-based authentication, refresh tokens, and logout functionality.

## Features

* User registration with hashed passwords using bcrypt
* User login and credential validation
* JWT access tokens and refresh tokens
* HTTP-only cookies for refresh token storage
* Protected routes using authentication middleware
* Token refresh endpoint
* Logout functionality to clear authentication cookies
* MongoDB integration using Mongoose

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* cookie-parser
* dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd Auth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   SECRET_ACCESS_TOKEN=your_access_token_secret
   REFRESH_ACCESS_TOKEN=your_refresh_token_secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | Authenticate a user            |
| GET    | `/auth/refresh`  | Generate a new access token    |
| GET    | `/auth/logout`   | Clear the refresh token cookie |
| GET    | `/users`         | Access protected user data     |

*Adjust the endpoint paths and HTTP methods to match your route configuration.*

## Authentication Flow

1. Register an account with user details.

2. Log in with email and password.

3. Receive an access token and an HTTP-only refresh token cookie.

4. Include the access token in protected requests:

   ```http
   Authorization: Bearer <access_token>
   ```

5. Use the refresh endpoint to obtain a new access token when needed.

6. Log out to clear the refresh token cookie.