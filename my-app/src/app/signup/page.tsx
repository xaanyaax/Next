"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login"); //like useNavigate in react-router

        }
        catch(error){
            toast.error("Something went wrong")

        } 
        finally{
            setLoading(false)
        }


    }



    // check if username, email and password are entered
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);



    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">{loading ?  "Processing" : "Signup"}
        <hr />
        <label htmlFor="username">username</label>
        <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Username" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
        <label htmlFor="username">email</label>
    <input type="text"  id="email" value={user.email} onChange={(e) => setUser({...user , email: e.target.value})} placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>
    <label htmlFor="username">password</label>

    <input type="password"  id="username" value={user.password} onChange={(e) => setUser({...user , password: e.target.value})} placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>

    <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
    onClick={onSignup}>{buttonDisabled ? "No signup" : "Signup here"}</button>
    
    <Link href="/login">Visit login page</Link>
    </div>

    )
}