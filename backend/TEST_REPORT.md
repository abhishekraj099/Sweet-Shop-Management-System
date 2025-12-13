# Test Report – Backend (Sweet Shop Management System)

## Command

cd backend
npm test


## Environment

- Node.js: (local system version)
- Package manager: npm
- Test runner: Jest (with ts-jest)
- HTTP testing: supertest
- Database: MongoDB Atlas (same cluster used by the app)

## Summary of Latest Run

- Test suites: 1 passed, 0 failed
- Tests: 1 passed, 0 failed
- Snapshots: 0
- Time: ~5.3 s

Output (shortened):

- `PASS tests/auth.sweets.test.ts`
- `Sweet Shop API basic flow`
  - `✓ allows admin to create and list sweets`

## What the test covers

File: `tests/auth.sweets.test.ts`

This test validates an end‑to‑end flow of the backend API:

1. Connect to the MongoDB database using `MONGODB_URI` from `.env`.  
2. Clear existing users and sweets with `User.deleteMany({})` and `Sweet.deleteMany({})`.  
3. Register an admin user via `POST /api/auth/register`.  
4. Log in with that admin via `POST /api/auth/login` and receive a valid JWT.  
5. Create a new sweet as admin with `POST /api/sweets` (protected route).  
6. Fetch the list of sweets via `GET /api/sweets` and assert that:
   - the request returns HTTP 200
   - the body is an array
   - at least one sweet (the one created) is present

This confirms that authentication, authorization, and the core sweets creation/listing flow of the backend work correctly against a real MongoDB instance.

