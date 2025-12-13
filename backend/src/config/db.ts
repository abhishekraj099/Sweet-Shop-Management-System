import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in .env");
}

export const connectDB = async () => {
  try {
    console.log("MONGODB_URI prefix:", MONGODB_URI.slice(0, 40));
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Mongo connection error", err);
    throw err;
  }
};
