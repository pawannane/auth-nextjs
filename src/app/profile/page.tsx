"use client";
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster }  from 'react-hot-toast'

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

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

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile page</h1>
      <hr />
      {data === 'nothing' ? "Nothing" : <Link className='py-2 px-4 rounded-lg mt-4 bg-blue-400 text-white hover:bg-slate-300 hover:text-blue-400 transition-all' href={`profile/${data}`}>{data}</Link>}
      
      <button className='py-2 px-4 rounded-lg mt-4 bg-green-500 text-white hover:bg-slate-300 hover:text-green-500 transition-all' onClick={getUserDetails}>GetUser Details</button>
      <button className='py-2 px-4 rounded-lg mt-4 bg-red-500 text-white hover:bg-slate-300 hover:text-red-500 transition-all' onClick={logout}>Logout</button>
      <Toaster />
    </div>
  )
}

export default Profile
