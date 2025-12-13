// tests/auth.sweets.test.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { User } from "../src/models/User";
import { Sweet } from "../src/models/Sweet";

jest.setTimeout(30000); // 30s timeout

describe("Sweet Shop API basic flow", () => {
  let adminToken: string;

  beforeAll(async () => {
    // connect to Mongo for tests
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);

    await User.deleteMany({});
    await Sweet.deleteMany({});

    const regRes = await request(app).post("/api/auth/register").send({
      email: "admin@test.com",
      password: "Admin123!",
      role: "admin",
    });
    expect(regRes.status).toBe(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "Admin123!",
    });
    expect(loginRes.status).toBe(200);
    adminToken = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("allows admin to create and list sweets", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 20,
        quantity: 10,
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.name).toBe("Gulab Jamun");

    const listRes = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);
  });
});
