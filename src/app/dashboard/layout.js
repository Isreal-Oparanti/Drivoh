import Navbar from "@/src/components/Navbar";
import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
