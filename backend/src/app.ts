import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import sweetRoutes from "./routes/sweets";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Connect to database (important for serverless)
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (_req, res) => {
  res.send("Sweet Shop API running");
});

export default app;
