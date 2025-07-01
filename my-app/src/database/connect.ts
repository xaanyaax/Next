import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("✅ Database connected successfully");
        });

        connection.on("error", (err) => {
            console.error("❌ Database connection error:", err);
        });

    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        throw error; // Optional: or handle the error appropriately
    }
}
