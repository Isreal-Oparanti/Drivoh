import Link from "next/link";
import { getCollection } from "../app/lib/db";
import getAuthUser from "../app/lib/getAuthUser";

export default async function Bookings() {
  const user = await getAuthUser();

  if (!user || !user.userId) {
    console.error("User not authenticated.");
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Upcoming Rides</h2>
        <p className="text-gray-600">Please log in to view bookings.</p>
        <Link
          href="/login"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  const bookingsCollections = await getCollection("bookings");
  const allBookings = await bookingsCollections.find({}).toArray();

  const sortedBookings = allBookings
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  console.log("All Bookings:", sortedBookings);

  if (sortedBookings && sortedBookings.length > 0) {
    return (
      <div className="space-y-4">
        {sortedBookings.map((booking) => (
          <div key={booking._id} className="p-4 rounded-lg">
            <div className="space-y-1">
              <div className="flex">
                <p className="font-medium">From: {booking.from}</p>
                <p className="font-medium">To: {booking.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time: {booking.time}</p>
                <p className="text-sm text-gray-600">Date: {booking.date}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex gap-4">
          <Link href="/bookings">Book a Ride</Link>
          <Link href="#" className="underline">
            View More
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Upcoming Rides</h2>
        <p className="text-gray-600">No scheduled rides. Book a ride now!</p>
        <Link
          href="/bookings"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Book a Ride
        </Link>
      </div>
    );
  }
}
