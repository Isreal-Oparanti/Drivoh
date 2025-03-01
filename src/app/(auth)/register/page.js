"use client";
import { register } from "@/src/actions/auth";
import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-white p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Create an Account
        </h2>
        <form action={action} className="mt-6 space-y-6">
          {/* Name Input */}
          <div className="relative">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-600 mt-1">{state.errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={state?.email}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-600 mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* School ID Input */}
          <div className="relative">
            <input
              name="schoolId"
              type="text"
              placeholder="School ID"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
            />
            {state?.errors?.schoolId && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.schoolId}
              </p>
            )}
          </div>

          {/* Password Input with Toggle Icon */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
            />
            {state?.errors?.password && (
              <div className="text-sm text-red-600 mt-1">
                {state.errors.password.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-blue-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Input with Toggle Icon */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.confirmPassword}
              </p>
            )}
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-blue-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            {isPending ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-900 font-bold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
