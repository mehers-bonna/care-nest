import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let cachedClient = null;
let cachedDb = null;

export const connectDB = async () => {
  // ১. Mongoose কানেকশন (বুকিং সেভ করার জন্য)
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Mongoose already connected");
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "care-nest",
        bufferCommands: false,
      });
      console.log("✅ Mongoose Connected");
    } catch (err) {
      console.error("❌ Mongoose Connection Error:", err);
    }
  }

  // ২. Native MongoClient কানেকশন (Authentication এর জন্য যা আগে ছিল)
  if (cachedDb) return cachedDb;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cachedDb = client.db("care-nest");
    cachedClient = client;

    console.log("✅ MongoDB Native Driver Connected");
    return cachedDb;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
};