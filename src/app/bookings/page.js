"use client";
import { useState } from "react";

export default function Booking() {
  const [booking, setBooking] = useState({ pickUp: "", time: "" });

  const handleChange = (e) =>
    setBooking({ ...booking, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking ride:", booking);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Book a Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="pickUp"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Pick-Up Point</option>
            <option value="Gate">Gate</option>
            <option value="Moremi">Moremi</option>
            <option value="Fajuyi">Fajuyi</option>
          </select>
          <select
            name="time"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            <option value="7:00 AM">7:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
          </select>
          <button type="submit" className="btn btn-primary w-full">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
