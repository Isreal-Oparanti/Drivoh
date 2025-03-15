"use client";

import { createBooking } from "@/src/actions/bookings";
import { useActionState, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import Receipt from "@/src/components/Reciept";

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

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [fare, setFare] = useState("");
  const [formData, setFormData] = useState({ from: "", to: "" });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [paymentReference, setPaymentReference] = useState(null);
  const router = useRouter();

  const calculateFare = (from, to) => {
    if (from === "Gate" && to) {
      return 250 * 100;
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

      setSelectedBooking(bookingData); // Set the selected booking data
      setIsModalOpen(true); // Open the modal

      startTransition(() => {
        action(bookingData);
      });
    },

    onClose: () => alert("Payment closed. Please complete your payment."),
  };

  return (
    <div>
      <div className="flex gap-3  mb-4">
        <button
          className="text-lg cursor-pointer hover:text-green-600 transition-colors"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          &#8592;
        </button>

        <h2 className="text-lg font-semibold">Bookings</h2>
      </div>

      <div className="flex items-center justify-center bg-base-200 p-4">
        <div className="w-full max-w-md shadow-xl p-6 bg-white rounded-lg">
          <h2
            className="text-2xl font-bold mb-4 text-center text-primary"
            style={{ color: "teal" }}
          >
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
                <option value="Ajose">AJOSE</option>
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
              <p className="text-sm text-red-600 mt-1">
                {state.errors.general}
              </p>
            )}

            {!paymentSuccess ? (
              <PaystackButton
                className="btn btn-primary bg-green-700 outline-none text-white p-3 rounded-lg w-full text-lg font-bold"
                {...paystackConfig}
              />
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary outline-none text-white p-3 rounded-lg w-full text-lg font-bold"
                style={{ backgroundColor: "teal" }}
              >
                {isPending ? "Processing..." : `Confirm Booking`}
              </button>
            )}
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Receipt booking={selectedBooking} />
            <a
              href="/dashboard"
              className="w-full mt-4 px-4 py-2  text-white rounded-lg flex items-center justify-center bg-red-500 bg-red-700 transition"

              // onClick={closeModal}
            >
              Close
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
