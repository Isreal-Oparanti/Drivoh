"use server";

import { getCollection } from "../app/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BookingFormSchema } from "../app/lib/rules";

export async function createBooking(state, formData) {
  const validatedFields = BookingFormSchema.safeParse({
    from: formData.from,
    to: formData.to,
    date: formData.date,
    time: formData.time,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { from, to, date, time } = validatedFields.data;

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return { errors: { session: "User not logged in." } };
  }

  const userId = session.value;

  const bookingCollection = await getCollection("bookings");

  if (!bookingCollection) {
    return { errors: { database: "Network Issue or Server issue!" } };
  }

  const results = await bookingCollection.insertOne({
    userId,
    from,
    to,
    date,
    time,
    status: "Pending",
    createdAt: new Date(),
  });

  console.log(results, "created bookings successfully");

  redirect("/dashboard");
}
