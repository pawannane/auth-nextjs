"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [])

  const handleSubmit = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/updatepassword", {token, password});
      toast.success(response.data.message);
      setPassword("");
      setUpdatedPassword(true);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl mb-4'>{loading ? "Processing" : "Update Password"}</h1>
      <label htmlFor="password">Enter your new password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline focus:border-gray-600"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button
        className="py-2 px-4 rounded-lg bg-black text-white hover:bg-slate-200 hover:text-black transition-all"
        onClick={handleSubmit}
      >
        Change Password
      </button>
      {
        updatedPassword && <Link className='mt-4 text-blue-500' href={"/login"}>Visit login page</Link> 
      }
      <Toaster />
    </div>
  )
}

export default UpdatePassword
