import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in .env");
}

// Simple interface for cached connection
interface CachedConnection {
  conn: any;
  promise: any;
}

// Extend global type
declare global {
  var mongooseCache: CachedConnection | undefined;
}

// Initialize cache
let cached: CachedConnection = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
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
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
  } catch (err) {
    cached.promise = null;
    console.error("Mongo connection error", err);
    throw err;
  }

  return cached.conn;
};
