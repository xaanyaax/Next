"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Login() {
    const router = useRouter(); //lets u navigate between pages
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false); //disable button
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            // toast.success("Login success")
            //toast not complete yet
            router.push("/profile");

        }
        catch (error: any) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message);

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);



    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">Login
        <hr />
        <label htmlFor="email">email</label>
        <input type="text" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
        <label htmlFor="username">password</label>

        <input type="password" id="username" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />

        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onLogin}>Login here</button>

        <Link href="/signup">Visit signup page</Link>
    </div>

    )
}