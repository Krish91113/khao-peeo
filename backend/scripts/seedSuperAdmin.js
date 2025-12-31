import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { ENV } from "../config/env.js";

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
       

        // Check if superadmin already exists
        const existingSuperAdmin = await User.findOne({ role: "superadmin" });

        if (existingSuperAdmin) {
    
            await mongoose.disconnect();
            return;
        }

        // Create superadmin
        const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10);

        const superAdmin = await User.create({
            fullName: "Super Administrator",
            email: "superadmin@khaopeeo.com",
            password: hashedPassword,
            role: "superadmin",
        });

    } catch (error) {
        console.error("❌ Error seeding superadmin:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

seedSuperAdmin();
