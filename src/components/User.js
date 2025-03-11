"use client";

import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log("Fetched user:", data);
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div className="flex justify-center items-center">
          <div
            style={{ backgroundColor: "teal" }}
            className="w-10 h-10  text-white rounded-full flex items-center justify-center text-lg font-semibold"
          >
            {user.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-4 border-teal-600 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
