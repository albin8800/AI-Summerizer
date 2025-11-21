"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      window.location.href = "/dashboard";
      toast.success("Login Successful!");
    } catch (error) {
      setError("Failed to login. Please check your credentials and try again.");
      toast.error("Login Failed. Please try again.");
    }
    setLoading(false);
  };

  {loading && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );}

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-8 w-full max-w-[550px]">

        
        <h1 className="text-[28px] md:text-[40px] font-semibold text-center">
          AI SUMMARIZER
        </h1>

        <h2 className="text-[18px] md:text-[24px] font-medium text-center text-[#666666]">
          Login to your Account
        </h2>

        {error && (
          <p className="pt-2 text-[#E00000] text-[14px] md:text-[16px] font-medium">
            {error}
          </p>
        )}

        
        <form
        autoComplete="off"
          onSubmit={handleLogin}
          className="flex flex-col w-full max-w-[523px] gap-6"
        >
          
          <div className="flex flex-col gap-2">
            <label className="flex text-[14px] md:text-[16px] gap-0.5">
              Email<span className="text-[#EE0000]">*</span>
            </label>

            <div className="relative w-full">
              <img
                src="/images/icons/mail.svg"
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
              />

              <input
                type="email"
                className="w-full h-12 rounded-full bg-[#F3F3F3] outline-none pl-12 pr-5 focus:ring-1 focus:ring-[#D6D6D6] text-[14px]"
                placeholder="Enter your Email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="flex text-[14px] md:text-[16px] gap-0.5">
              Password<span className="text-[#EE0000]">*</span>
            </label>

            <div className="relative w-full">
              <img
                src="/images/icons/key.svg"
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
              />

              <input
                type="password"
                className="w-full h-12 rounded-full bg-[#F3F3F3] outline-none pl-12 pr-5 focus:ring-1 focus:ring-[#D6D6D6] text-[14px]"
                placeholder="Enter your Password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

         
          <button className="mt-2 rounded-full border w-full h-12 border-black font-semibold text-[14px] hover:bg-black hover:text-white cursor-pointer transition-all duration-300">
            Log In
          </button>

          <p className="text-[14px] font-medium text-[#686868] text-center">
            Not Having an Account?{" "}
            <a href="/register">
              <span className="text-black font-semibold">Register</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
