import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
         <Sidebar/>
         <main className="flex-1">{children}</main>
      </div>
      
    </>
  );
};

export default Layout;
