import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in .env");
}

export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
};
