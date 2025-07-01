import { connect } from "@/database/connect";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // Connect to the database

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody) //to check if it works or not

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"} , {status: 400})
        }

        //create token data
        //JWT
        const tokenData = {
            id: user._id,
            username : user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1d"})

        //set in users cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        //this response can acess the user cookie
        response.cookies.set("token" , token , {
                httpOnly: true
        })

        return response;

    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}

//signup --> login --> jwt 
