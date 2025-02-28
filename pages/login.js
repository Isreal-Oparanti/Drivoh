import { useState } from "react";
import Link from "next/link";
 
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-white">
      <div className="card w-full max-w-md shadow-xl p-8 bg-white rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200" 
              onChange={handleChange} 
              required 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button 
            type="submit" 
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg w-full transition-all duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700">
          Don't have an account? <Link href="/register" className="text-blue-900 hover:underline font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
