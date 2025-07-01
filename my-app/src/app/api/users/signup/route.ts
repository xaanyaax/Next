import { connect } from "@/database/connect";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;     //data from frontend


        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save the new user in the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        //save the user
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}