"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const profile = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile page</h1>
      <hr />
      <button className='py-2 px-4 rounded-lg mt-4 bg-red-500 text-white hover:bg-slate-300 hover:text-red-500 transition-all' onClick={logout}>Logout</button>
    </div>
  )
}

export default profile
