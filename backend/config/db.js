import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI is not set in environment variables");
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};


