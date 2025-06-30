"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Login() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {


    }


    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">Login
        <hr />
        <label htmlFor="email">email</label>
    <input type="text"  id="email" value={user.email} onChange={(e) => setUser({...user , email: e.target.value})} placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>
    <label htmlFor="username">password</label>

    <input type="password"  id="username" value={user.password} onChange={(e) => setUser({...user , password: e.target.value})} placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>

    <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
    onClick={onLogin}>Login here</button>
    
    <Link href="/signup">Visit signup page</Link>
    </div>

    )
}