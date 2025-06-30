import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)

        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Database connected sucessfully")
        })

        connection.on('error', (err) => {
            console.log("Database connection failed", err)
            process.exit()
        })

    }

    catch (error) {
        console.log("Database not connected")
    }
}