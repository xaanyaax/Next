"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Profilepage() {

    const router = useRouter();

    const logout = async () => {
        try {

            const response = await axios.get("/api/users/logout")

            console.log("Logout successful")
            router.push("/login")

        } catch (error: any) {
            console.log(error.message)
            alert("Logout failed: " + error.message);

        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}