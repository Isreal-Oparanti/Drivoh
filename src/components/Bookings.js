import Link from "next/link";
import { getCollection } from "../app/lib/db";
import getAuthUser from "../app/lib/getAuthUser";
import { ObjectId } from "mongodb";

export default async function Bookings() {
  const user = await getAuthUser();

  if (!user || !user.userId) {
    console.error("User not authenticated.");
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Booking History</h2>
        <p className="text-gray-600">Please log in to view your bookings.</p>
        <Link
          href="/login"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  const bookingsCollection = await getCollection("bookings");
  const allBookings = await bookingsCollection
    .find({ userId: ObjectId.createFromHexString(user.userId) })
    .sort({ createdAt: -1 })
    .toArray();

  console.log(allBookings);

  const hasMoreBookings = allBookings.length > 3;

  return (
    <div className="max-w-2xl bg-white rounded-lg p-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Bookings
      </h2>

      {allBookings.length > 0 ? (
        <div className="space-y-4">
          {allBookings.map((booking, index) => (
            <div
              key={booking._id}
              className={`p-4 border rounded-lg shadow-sm ${
                index === 0 ? "border-blue-500 bg-blue-50" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-lg">
                    {booking.from} → {booking.to}{" "}
                    {index === 0 && (
                      <span
                        style={{ color: "teal" }}
                        className=" font-semibold"
                      >
                        (Current Route)
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ride Date: {booking.date} | Time: {booking.time}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      booking.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    Status: {booking.status}
                  </p>
                </div>
                <small>{booking.createdAt.toLocaleString()}</small>
              </div>

              {booking.status === "pending" && (
                <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded">
                  <p className="text-sm font-semibold text-green-700">
                    Receipt
                  </p>
                  <p className="text-xs text-gray-600">
                    Amount: ₦{(Math.random() * 5000 + 1000).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">Payment Method: Card</p>
                  <p className="text-xs text-gray-600">
                    Transaction ID:{" "}
                    {Math.random().toString(36).substring(2, 12)}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3 mt-2">
            <div className="">
              <Link
                href="/bookings"
                className="px-5 py-2 bg-teal-600   text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                style={{ backgroundColor: "teal" }}
              >
                + Book a Ride
              </Link>
            </div>
            {hasMoreBookings && (
              <div className="text-center">
                <Link
                  href="/bookings/history"
                  className="px-5 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  View More History
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No bookings found.</p>
      )}
    </div>
  );
}
