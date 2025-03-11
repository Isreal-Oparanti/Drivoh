"use client";
import Receipt from "@/src/components/Reciept";
import UserDetails from "@/src/components/User";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const response = await fetch("/api/bookings", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data.bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="flex gap-3  mb-4">
        <button
          className="text-lg cursor-pointer hover:text-green-600 transition-colors"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          &#8592;
        </button>

        <h2 className="text-lg font-semibold">Your Booking History</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 border rounded-lg shadow-sm cursor-pointer bg-gray-50"
              onClick={() => openModal(booking)}
            >
              <p className="font-medium text-lg">
                {booking.from} → {booking.to}
              </p>
              <p className="text-sm text-gray-500">
                Date: {booking.date} | Time: {booking.time}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No bookings found.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Receipt booking={selectedBooking} />
            <button
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
