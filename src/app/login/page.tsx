"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success(response.data.message);
      setUser({ email: "", password: "" })
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-6 text-2xl">{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline focus:border-gray-600"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline focus:border-gray-600"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="py-2 px-4 rounded-lg bg-black text-white hover:bg-slate-200 hover:text-black transition-all"
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login here"}
      </button>
      <Link className="mt-2 text-blue-500" href={"/signup"}>
        Link to Signup here
      </Link>
      <p className="mt-2">Forgot your password? <Link className="text-blue-500" href={"/forgotpassword"}>Click here</Link></p>
      <Toaster />
    </div>
  );
};

export default Login;
