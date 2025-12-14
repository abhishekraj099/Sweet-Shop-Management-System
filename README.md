# Sweet Shop Management System

A full‑stack web application to manage sweets inventory, pricing, and purchases. Users can log in, view sweets, search and filter by different criteria, and perform inventory operations through a modern dashboard UI.

---

## Features

- User registration and login with JWT authentication
- Protected dashboard for authenticated users
- View all sweets with name, category, price, and quantity
- Search by name and filter by:
  - Category
  - Minimum price
  - Maximum price
- Add new sweets (name, category, price, quantity)
- Edit existing sweets
- Delete sweets
- Purchase sweets (decrease quantity)
- Low‑stock indicator (quantity less than 5)
- Persistent login using local storage
- Responsive dark‑themed UI

---

## Tech Stack

**Frontend**

- React with TypeScript
- Vite
- React Router
- Axios
- CSS (custom styling)

**Backend**

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- CORS

**Testing**

- Jest
- Supertest

---

## Project Structure

root/
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.tsx
│ │ │ ├── Register.tsx
│ │ │ └── Dashboard.tsx
│ │ ├── App.tsx
│ │ ├── api.ts
│ │ └── App.css
│ ├── index.html
│ ├── package.json
│ └── vite.config.ts
│
└── backend/
├── src/
│ ├── config/
│ │ └── db.ts
│ ├── models/
│ │ ├── User.ts
│ │ └── Sweet.ts
│ ├── middleware/
│ │ └── auth.ts
│ ├── routes/
│ │ ├── auth.ts
│ │ └── sweets.ts
│ ├── app.ts
│ └── server.ts
├── tests/
│ └── auth.sweets.test.ts
├── package.json
└── tsconfig.json


---

## Getting Started

### Prerequisites

- Node.js (recommended 18+)
- npm
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

---

## Backend Setup

1. Go to backend folder:

npm install


3. Create a `.env` file in `backend/`:


MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_jwt_secret_here
PORT=5000



4. Start the backend in development mode:



npm run dev


The API will be available at `http://localhost:5000`.

---

## Frontend Setup

1. Go to frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Create a `.env` file in `frontend/`:

VITE_API_BASE_URL=http://localhost:5000/api


4. Start the frontend dev server:


npm run dev


The app will be available at `http://localhost:5173`.

---

## Running the App Locally

1. Start MongoDB (or make sure your Atlas cluster is running).
2. Start backend:

cd backend
npm run dev


3. Start frontend in a second terminal:


cd frontend
npm run dev



4. Open the browser at `http://localhost:5173`.

---

## API Overview

All protected routes require a JWT in the `Authorization` header:


Authorization: Bearer <token>


### Auth

- `POST /api/auth/register`  
  Register a new user.

- `POST /api/auth/login`  
  Login and receive a JWT token.

### Sweets (protected)

- `POST /api/sweets`  
  Create a new sweet.

- `GET /api/sweets`  
  List all sweets.

- `GET /api/sweets/search`  
  Query by name, category, and/or price range.

- `PUT /api/sweets/:id`  
  Update a sweet.

- `DELETE /api/sweets/:id`  
  Delete a sweet.

### Inventory (protected)

- `POST /api/sweets/:id/purchase`  
  Purchase a sweet and decrease quantity.

---

## Tests

The backend is covered by Jest + Supertest integration tests.

### Run Tests


cd backend
npm test


The main suite (`tests/auth.sweets.test.ts`) covers:

- Connecting to MongoDB
- Registering a user
- Logging in and receiving a JWT
- Creating a sweet
- Listing sweets and verifying created data

---

# Sweet Shop Management System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://sweetfrontend.vercel.app)
[![Backend API](https://img.shields.io/badge/api-live-blue)](https://sweetbackend.vercel.app)

**Live Demo:** https://sweetfrontend.vercel.app  
**Backend API:** https://sweetbackend.vercel.app





