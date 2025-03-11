"use client";
import { useRef } from "react";
import { FaCheckCircle, FaDownload, FaCar } from "react-icons/fa";
import generatePDF from "react-to-pdf";

export default function Receipt({ booking }) {
  const targetRef = useRef();

  if (!booking) {
    return <p className="text-gray-500">No booking data available.</p>;
  }

  return (
    <div>
      <div
        ref={targetRef}
        className="p-4 relative bg-white border-2 border-red-200 "
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
          <FaCar
            style={{ color: "teal" }}
            className="text-blue-600 text-3xl mx-auto mb-2"
          />
          <h2 className="text-xl font-bold text-gray-800">Drivoh!</h2>
          <p className="text-sm text-gray-500">Thank you for riding with us!</p>
        </div>
        {/* <UserDetails /> */}

        <div className="border-t flex justify-center items-center my-3 py-3">
          <p className="text-sm font-semibold text-green-600 flex items-center">
            <FaCheckCircle className="mr-1 text-lg" />
          </p>
          <div className="flex justify-center gap-3 items-center">
            <p className="text-lg font-semibold">₦{booking.price || "500"}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Route:</p>
            <p className="text-sm text-gray-500">
              {booking.from} → {booking.to}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Ride Date:</p>
            <p className="text-sm">{booking.date}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Time:</p>
            <p className="text-sm">{booking.time}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Booking ID:</p>
            <p className="text-sm">{booking._id}</p>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-gray-700">Vehicle:</p>
            <p className="text-sm">{booking.vehicle || "Unknown"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Driver:</p>
            <p className="text-sm">{booking.driver || "N/A"}</p>
          </div>
        </div>
      </div>
      <button
        style={{ backgroundColor: "teal" }}
        className="w-full mt-4 px-4 py-2  text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
        onClick={() => generatePDF(targetRef, { filename: "Bookings.pdf" })}
      >
        <FaDownload className="mr-2" />
        Save Receipt
      </button>
    </div>
  );
}

{
  /* <div className="border-t pt-1 mt-3 text-center text-sm text-gray-500">
<p>Need Help? Contact Support</p>
<p>Drivoh! © {new Date().getFullYear()}</p>
</div> */
}
