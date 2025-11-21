"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function RegisterPage() {

    const { register } = useAuth();
    const router = useRouter();

    const [ form, setForm ] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if(!name || !email || !password){
            setError("All fields are Required");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            await register(name, email, password);
            router.push("/login");
            toast.success("Registration Successful! Please Login.");

        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
            toast.error("Registration Failed. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    
 
    return (
       <div className="w-full min-h-screen flex items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-8 w-full max-w-[550px]">

        
        <h1 className="text-[28px] md:text-[40px] font-semibold text-center">
          AI SUMMARIZER
        </h1>

        <h2 className="text-[18px] md:text-[24px] font-medium text-center text-[#666666]">
          Register your Account
        </h2>

       
        {error && (
          <p className="pt-2 text-[#E00000] text-[14px] md:text-[16px] font-medium">
            {error}
          </p>
        )}
        
        <form className="flex flex-col w-full max-w-[523px] gap-6"
        autoComplete="off"
        onSubmit={handleSubmit}
        >
          
          <div className="flex flex-col gap-2">
            <label className="flex text-[14px] md:text-[16px] gap-0.5">
              Full Name<span className="text-[#EE0000]">*</span>
            </label>

            <div className="relative w-full">
              <img
                src="/images/icons/person.svg"
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
              />

              <input
                type="text"
                className="w-full h-12 rounded-full bg-[#F3F3F3] outline-none pl-12 pr-5 focus:ring-1 focus:ring-[#D6D6D6] text-[14px]"
                autoComplete="off"
                placeholder="Enter your Full Name"
                required
                value={name}
                onChange= {(e) => setName(e.target.value)}
                
              />
            </div>
          </div>
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
                autoComplete="off"
                placeholder="Enter your Email"
                required
                value = {email}
                onChange={(e)=> setEmail(e.target.value)}
                
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
                autoComplete="new-password"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
              />
            </div>
          </div>

         
          <button className="mt-2 rounded-full border w-full h-12 border-black font-semibold text-[14px] hover:bg-black hover:text-white cursor-pointer transition-all duration-300">
            {loading ? "Registering...": "Register"}
          </button>

          <p className="text-[14px] font-medium text-[#686868] text-center">
            Already have an Account?{" "}
            <a href="/login">
              <span className="text-black font-semibold">Login</span>
            </a>
          </p>
        </form>
      </div>
    </div>
    )
}