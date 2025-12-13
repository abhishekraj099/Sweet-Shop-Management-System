# Sweet Shop Management System – Backend

This is the RESTful backend API for the Sweet Shop Management System kata, built with Node.js, Express, TypeScript, Jest, and MongoDB.[file:3]

## Tech stack

- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Jest + Supertest for testing[file:3]

## Project structure

- `src/config/db.ts` – database connection
- `src/models/User.ts` – user schema and model
- `src/models/Sweet.ts` – sweet schema and model
- `src/middleware/auth.ts` – JWT authentication middleware
- `src/routes/auth.ts` – auth routes (register, login)
- `src/routes/sweets.ts` – sweets CRUD and inventory routes
- `src/app.ts` – Express app setup and route wiring
- `src/server.ts` – server bootstrap (port + DB connect)
- `tests/auth.sweets.test.ts` – integration tests for auth and sweets APIs[file:3]

## Setup and running locally

1. Install dependencies:

cd backend
npm install



2. Create an `.env` file in `backend/` based on these variables:

MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_jwt_secret_here
PORT=5000


3. Start the development server:

npm run dev


The API will be available at `http://localhost:5000` (or the port you configure).

## Running tests

Run the Jest test suite:

cd backend
npm test


This executes the integration tests in `tests/auth.sweets.test.ts`, covering user auth and sweets endpoints using a red–green–refactor TDD flow.[file:3]

## API endpoints

All sweets and inventory routes are protected and require a valid JWT in the `Authorization: Bearer <token>` header.

### Auth

- `POST /api/auth/register` – register a new user
- `POST /api/auth/login` – log in and receive a JWT token[file:3]

### Sweets (protected)

- `POST /api/sweets` – create a new sweet
- `GET /api/sweets` – list all sweets
- `GET /api/sweets/search` – search by name, category, or price range
- `PUT /api/sweets/:id` – update sweet details
- `DELETE /api/sweets/:id` – delete a sweet (admin only)[file:3]

### Inventory (protected)

- `POST /api/sweets/:id/purchase` – purchase a sweet and decrease quantity
- `POST /api/sweets/:id/restock` – restock a sweet and increase quantity (admin only)[file:3]
