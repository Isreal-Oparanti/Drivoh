import { getCollection } from "../../lib/db";
import getAuthUser from "../../lib/getAuthUser";

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user || !user.userId) {
      return Response.json({ bookings: [] }, { status: 200 });
    }

    const bookingsCollection = await getCollection("bookings");
    const userBookings = await bookingsCollection.find({}).toArray();

    return Response.json({ bookings: userBookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
