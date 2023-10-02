"use client";
import React, { useState } from 'react'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = async() => {
    try {
      setLoading(true);
      if(email === '') 
        return toast.error("Please enter your email");

      const response = await axios.post("/api/users/forgotpassword", {email});
      toast.success(`Please check your email! ${response.data.message}`);
      setEmail("");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl mb-4'>{loading ? "Processing" : "Forgot Password"}</h1>
      <label htmlFor="password">Enter your Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline focus:border-gray-600"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button
        className="py-2 px-4 rounded-lg bg-black text-white hover:bg-slate-200 hover:text-black transition-all"
        onClick={handlePassword}
      >
        Change Password
      </button>
      <Link className="mt-2 text-blue-400" href="/login">Back to Login</Link>
      <Toaster />
    </div>
  )
}

export default ForgotPassword
