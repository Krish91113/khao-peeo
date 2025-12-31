import dotenv from "dotenv";
import { Table } from "../models/Table.model.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const seedTables = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Check if tables already exist
    const existingTables = await Table.countDocuments();
    if (existingTables > 0) {
      
      process.exit(0);
    }

    // Create default tables (10 tables - matching your previous Supabase setup)
    // Using table numbers like 101, 102, etc. to match your previous setup
    const tablesData = [
      { tableNumber: 101, capacity: 2 },
      { tableNumber: 102, capacity: 4 },
      { tableNumber: 103, capacity: 4 },
      { tableNumber: 104, capacity: 6 },
      { tableNumber: 201, capacity: 2 },
      { tableNumber: 202, capacity: 4 },
      { tableNumber: 203, capacity: 4 },
      { tableNumber: 301, capacity: 8 },
      { tableNumber: 302, capacity: 4 },
      { tableNumber: 303, capacity: 2 },
    ];

    const createdTables = await Table.insertMany(tablesData);
    
    createdTables.forEach((table) => {
      
    });


    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding tables:", error);
    process.exit(1);
  }
};

seedTables();
