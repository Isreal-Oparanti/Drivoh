"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaDownload, FaCar } from "react-icons/fa";

export default function Receipt({ booking }) {
  const receiptRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Campus_Ride_Receipt`,
  });

  if (!booking) return null;

  return (
    <div ref={receiptRef} className="p-4 border border-gray-300 rounded-lg">
      <div className="text-center mb-4">
        <FaCar className="text-blue-600 text-3xl mx-auto mb-2" />
        <h2 className="text-xl font-bold text-gray-800">Campus Ride Receipt</h2>
        <p className="text-sm text-gray-500">Thank you for riding with us!</p>
      </div>

      <div className="border-t pt-4">
        <p className="font-semibold text-lg">
          {booking.from} → {booking.to}
        </p>
        <p className="text-sm text-gray-500">
          Date: {booking.date} | Time: {booking.time}
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
            <FaCheckCircle className="mr-1 text-lg" />{" "}
            {booking.paymentStatus || "Pending"}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {booking.paymentMethod || "N/A"}
        </p>
      </div>

      <div className="border-t pt-4 mt-4 text-center text-sm text-gray-500">
        <p>Need Help? Contact Support</p>
        <p>Campus Ride © {new Date().getFullYear()}</p>
      </div>

      <button
        onClick={handlePrint}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
      >
        <FaDownload className="mr-2" /> Download Receipt (PDF)
      </button>
    </div>
  );
}
