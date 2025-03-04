"use client";

import { createBooking } from "@/src/actions/bookings";
import { useActionState, useState } from "react";

export default function Booking() {
  const [state, action, isPending] = useActionState(createBooking, undefined);
  const [fare, setFare] = useState("");
  const [formData, setFormData] = useState({ from: "", to: "" });

  const calculateFare = (from, to) => {
    if (from === "Gate" && to) {
      return "300 Naira";
    } else if (
      (from === "Oduduwa_Estate/Damico" || from === "AP/Mayfair") &&
      to
    ) {
      return "500 Naira";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (newFormData.from && newFormData.to) {
      const fareAmount = calculateFare(newFormData.from, newFormData.to);
      setFare(fareAmount);
    } else {
      setFare("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Book a Ride
        </h2>
        <form action={action} className="space-y-4">
          <div className="relative">
            <label className="block font-semibold">Pick-Up Point</label>
            <select
              name="from"
              className="select select-bordered w-full outline-none p-3 rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">Select Pick-Up Point</option>
              <option value="Gate">Gate</option>
              <option value="Oduduwa_Estate/Damico">
                Oduduwa Estate/Damico
              </option>
              <option value="AP/Mayfair">AP/Mayfair</option>
            </select>
            {state?.errors?.from && (
              <p className="text-sm text-red-600 mt-1">{state.errors.from}</p>
            )}
          </div>

          <div className="relative">
            <label className="block font-semibold">Destination</label>
            <select
              name="to"
              className="select select-bordered w-full outline-none p-3 rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">Select Destination</option>
              <option value="SUB">SUB</option>
              <option value="Ajose">ICT</option>
              <option value="PG">PG Hall</option>
              <option value="New_Market">New Market</option>
            </select>
            {state?.errors?.to && (
              <p className="text-sm text-red-600 mt-1">{state.errors.to}</p>
            )}
          </div>

          <div className="relative">
            <label className="block font-semibold">Select Date</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full outline-none p-3 rounded-md bg-gray-200"
              required
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
            />
            {state?.errors?.date && (
              <p className="text-sm text-red-600 mt-1">{state.errors.date}</p>
            )}
          </div>

          <div className="relative">
            <label className="block font-semibold">Select Time Slot</label>
            <select
              name="time"
              className="select select-bordered w-full outline-none p-3 rounded-md"
              required
            >
              <option value="">Select Time Slot</option>
              <option value="7:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="12:00 PM">10:00 AM</option>
              <option value="12:00 PM">1:00 PM</option>
              <option value="12:00 PM">2:00 PM</option>
              <option value="12:00 PM">4:00 PM</option>
              <option value="12:00 PM">5:00 PM</option>
              <option value="12:00 PM">6:00 PM</option>
            </select>
            {state?.errors?.time && (
              <p className="text-sm text-red-600 mt-1">{state.errors.time}</p>
            )}
          </div>

          {state?.errors?.general && (
            <p className="text-sm text-red-600 mt-1">{state.errors.general}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary bg-blue-800 outline-none text-white p-3 rounded-lg w-full text-lg font-bold"
          >
            {isPending
              ? "Processing..."
              : `Confirm Booking${fare ? ` - ${fare}` : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
}
