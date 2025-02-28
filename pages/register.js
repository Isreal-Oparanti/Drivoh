// src/pages/register.js
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", schoolId: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="schoolId" type="text" placeholder="School ID" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
}
