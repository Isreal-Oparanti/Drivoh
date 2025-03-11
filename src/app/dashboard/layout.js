import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default Layout;
