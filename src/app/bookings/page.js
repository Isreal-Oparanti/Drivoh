"use client";
import { useState } from "react";

export default function Booking() {
  const [booking, setBooking] = useState({ from: "", to: "Campus", date: "", time: "", paymentMethod: "" });

  const handleChange = (e) =>
    setBooking({ ...booking, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking ride:", booking);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Book a Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           
          <label className="block font-semibold">Pick-Up Point</label>
          <select
            name="from"
            className="select select-bordered w-full outline-none"
            onChange={handleChange}
            required
          >
            <option value="">Select Pick-Up Point</option>
            <option value="Gate">Gate</option>
            <option value="Moremi">Moremi</option>
            <option value="Fajuyi">Fajuyi</option>
          </select>
          
           
          <label className="block font-semibold">Destination</label>
          <input
            type="text"
            name="to"
            value="Campus"
            readOnly
            className="input input-bordered w-full bg-gray-100 outline-none"
          />
          
           
          <label className="block font-semibold">Select Date</label>
          <input
            type="date"
            name="date"
            className="input input-bordered w-full outline-none"
            onChange={handleChange}
            required
          />
          
           
          <label className="block font-semibold">Select Time Slot</label>
          <select
            name="time"
            className="select select-bordered w-full outline-none"
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            <option value="7:00 AM">7:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
          </select>
          
           
          <label className="block font-semibold">Payment Method</label>
          <select
            name="paymentMethod"
            className="select select-bordered w-full outline-none"
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Wallet">Wallet</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>
          
          <button type="submit" className="btn btn-primary bg-blue-800 outline-none text-white p-3 rounded-lg w-full text-lg font-bold">
            Confirm Booking & Payment
          </button>
        </form>
      </div>
    </div>
  );
}
