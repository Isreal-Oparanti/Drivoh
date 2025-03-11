import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <aside className=" w-64 bg-white border border-t-0 p-4 hidden md:block h-screen">
        {/* <Link href="/">
          <img
            src="/logo.jpeg"
            width={60}
            alt="Logo"
            className="text-2xl font-bold mb-4"
          />
        </Link> */}
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/bookings"
            className="block p-2 rounded hover:bg-gray-100"
          >
            My Bookings
          </Link>
          <Link
            href="/bookings/history"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Transactions
          </Link>
          <Link href="/current" className="block p-2 rounded hover:bg-gray-100">
            Profile{" "}
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
