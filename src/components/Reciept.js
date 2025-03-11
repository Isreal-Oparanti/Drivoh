"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaDownload, FaCar } from "react-icons/fa";
import UserDetails from "./User";

export default function Receipt({ booking }) {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => {
      console.log("Printing content:", receiptRef.current);
      return receiptRef.current;
    },
    documentTitle: `Drivoh!`,
    onAfterPrint: () => console.log("Print completed!"),
    onPrintError: (error) => console.error("Print error:", error),
  });

  if (!booking) {
    return <p className="text-gray-500">No booking data available.</p>;
  }

  return (
    <div
      ref={receiptRef}
      className="p-4 relative bg-white"
      style={{
        border: "2px solid transparent",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    //     backgroundImage: `
    //     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M0 10 Q 5 5, 10 10 T 20 10' stroke='%23CBD5E0' fill='none' stroke-width='2'/%3E%3C/svg%3E"),
    //     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M0 10 Q 5 15, 10 10 T 20 10' stroke='%23CBD5E0' fill='none' stroke-width='2'/%3E%3C/svg%3E")
    //   `,
        backgroundPosition: "left top, left bottom",
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className="text-center mb-4">
        <FaCar className="text-blue-600 text-3xl mx-auto mb-2" />
        <h2 className="text-xl font-bold text-gray-800">Drivoh!</h2>
        <p className="text-sm text-gray-500">Thank you for riding with us!</p>
      </div>

      <div className="border-t pt-4">
        <UserDetails />

        <p className="font-semibold text-lg">
          {booking.from} → {booking.to}
        </p>
        <p className="text-sm text-gray-500">
          Ride Date: {booking.date} | Time: {booking.time}
        </p>
        <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <p className="text-sm font-semibold text-gray-700">
          Vehicle: {booking.vehicle || "Unknown"}
        </p>
        <p className="text-sm text-gray-500">
          Driver: {booking.driver || "N/A"}
        </p>
      </div>

      <div className="border-t pt-4 mt-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">
            Amount Paid: ₦{booking.price || "0"}
          </p>
          <p className="text-sm font-semibold text-green-600 flex items-center">
            <FaCheckCircle className="mr-1 text-lg" /> {"Paid"}
          </p>
        </div>
      </div>

      <div className="border-t pt-1 mt-3 text-center text-sm text-gray-500">
        {/* <p>Need Help? Contact Support</p>
        <p>Drivoh! © {new Date().getFullYear()}</p> */}
      </div>

      <button
        onClick={handlePrint}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
      >
        <FaDownload className="mr-2" /> Download Receipt
      </button>
    </div>
  );
}
