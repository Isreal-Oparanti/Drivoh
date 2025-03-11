"use client";

import { createBooking } from "@/src/actions/bookings";
import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { startTransition } from "react";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function Booking() {
  const [state, action, isPending] = useActionState(
    createBooking,
    (prevState, result) => {
      console.log("Booking Result:", result);
      return result;
    },
    undefined
  );

  const [fare, setFare] = useState("");
  const [formData, setFormData] = useState({ from: "", to: "" });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState(null);

  const calculateFare = (from, to) => {
    if (from === "Gate" && to) {
      return 300 * 100;
    } else if (
      (from === "Oduduwa_Estate/Damico" || from === "AP/Mayfair") &&
      to
    ) {
      return 500 * 100;
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "from" || name === "to") {
      const fareAmount = calculateFare(
        name === "from" ? value : formData.from,
        name === "to" ? value : formData.to
      );
      setFare(fareAmount);
    }
  };

  const paystackConfig = {
    email: "bellobambo21@gmail.com",
    amount: fare,
    metadata: {
      from: formData.from,
      to: formData.to,
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    text: `Pay ₦ ${fare / 100} to Book Trip`,
    onSuccess: (response) => {
      setPaymentSuccess(true);
      setPaymentReference(response.reference);

      if (!formData.date || !formData.time) {
        alert("Please select a date and time before proceeding.");
        return;
      }

      const bookingData = {
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        amount: fare / 100,
        paymentRef: response.reference,
      };

      startTransition(() => {
        action(bookingData);
      });
    },

    onClose: () => alert("Payment closed. Please complete your payment."),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Book a Ride
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="">
            <label className="font-semibold">Pick-Up Point</label>
            <select
              name="from"
              className="select select-bordered w-full outline-none p-3 rounded-md text-sm"
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
              onChange={handleChange}
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
              onChange={handleChange}
            >
              <option value="">Select Time Slot</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>

            {state?.errors?.time && (
              <p className="text-sm text-red-600 mt-1">{state.errors.time}</p>
            )}
          </div>

          {state?.errors?.general && (
            <p className="text-sm text-red-600 mt-1">{state.errors.general}</p>
          )}

          {!paymentSuccess ? (
            <PaystackButton
              className="btn btn-primary bg-blue-800 outline-none text-white p-3 rounded-lg w-full text-lg font-bold"
              {...paystackConfig}
            />
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary outline-none text-white p-3 rounded-lg w-full text-lg font-bold"
              style={{backgroundColor: "teal"}}
            >
              {isPending ? "Processing..." : `Confirm Booking`}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
