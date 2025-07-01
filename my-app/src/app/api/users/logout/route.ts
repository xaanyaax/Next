// to logout means u need to clear out the token

import { NextResponse } from "next/server";

export async function GET(){
    try {
        const reponse = await NextResponse.json({message: "Logout successful"}, {status: 200} )

        response.cookies.set("token" , "" , {httpOnly: true, expires: new Date(0)});
        return reponse;

    } catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}