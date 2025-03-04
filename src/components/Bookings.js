import Link from "next/link";
import { getCollection } from "../app/lib/db";

export default async function Bookings() {
  const bookingsCollections = await getCollection("bookings");
  const posts = await bookingsCollections?.find().toArray();

  const sortedPosts = posts
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  console.log("All bookings", sortedPosts);

  if (sortedPosts && sortedPosts.length > 0) {
    return (
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <div key={post._id} className="p-4 rounded-lg">
            <div className="space-y-1">
              <div className="flex">
                <p className="font-medium">From: {post.from}</p>
                <p className="font-medium">To: {post.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time: {post.time}</p>
                <p className="text-sm text-gray-600">Date: {post.date}</p>
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
        <h2 className="text-lg font-semibold mb-2">Upcoming Ride</h2>
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
