import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in .env");
}

// Type declaration for global - MUST BE AT TOP
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Cache the connection to reuse across serverless function invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // Create new connection if promise doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Creating new MongoDB connection...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("Mongo connection error", err);
    throw err;
  }

  return cached.conn;
};
