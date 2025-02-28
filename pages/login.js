// src/pages/login.js
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-center mt-2">
          Don't have an account? <Link href="/register" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
