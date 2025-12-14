import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import sweetRoutes from "./routes/sweets";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

// Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://sweetfrontend.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Middleware to ensure DB connection before each request
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    next(error);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (_req, res) => {
  res.send("Sweet Shop API running");
});

export default app;
