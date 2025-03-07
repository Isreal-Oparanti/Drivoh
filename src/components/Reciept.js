"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaDownload, FaCar } from "react-icons/fa";

export default function Receipt() {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Campus_Ride_Receipt`,
  });

  // Dummy Data
  const booking = {
    from: "Campus Gate",
    to: "Student Hostel",
    date: "March 7, 2025",
    time: "2:30 PM",
    bookingId: "CR-987654",
    price: "1,500",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    vehicle: "Toyota Corolla",
    driver: "John Doe",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div ref={receiptRef} className="p-4 border border-gray-300 rounded-lg">
          {/* Header */}
          <div className="text-center mb-4">
            <FaCar className="text-blue-600 text-3xl mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-800">Campus Ride Receipt</h2>
            <p className="text-sm text-gray-500">Thank you for riding with us!</p>
          </div>

          {/* Booking Details */}
          <div className="border-t pt-4">
            <p className="font-semibold text-lg">{booking.from} → {booking.to}</p>
            <p className="text-sm text-gray-500">Date: {booking.date} | Time: {booking.time}</p>
            <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
          </div>

          {/* Vehicle & Driver */}
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-semibold text-gray-700">Vehicle: {booking.vehicle}</p>
            <p className="text-sm text-gray-500">Driver: {booking.driver}</p>
            <p className="text-sm text-gray-500">Student: {booking.driver}</p>
          </div>

          {/* Price & Status */}
          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Amount Paid: ₦{booking.price}</p>
              <p className="text-sm font-semibold text-green-600 flex items-center">
                <FaCheckCircle className="mr-1 text-lg" /> {booking.paymentStatus}
              </p>
            </div>
            <p className="text-sm text-gray-500">{booking.paymentMethod}</p>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 mt-4 text-center text-sm text-gray-500">
            <p>Need Help? Contact Support</p>
            <p>Campus Ride © {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FaDownload className="mr-2" /> Download Receipt (PDF)
        </button>
      </div>
    </div>
  );
}


