"use server";

import { getCollection } from "../app/lib/db";
import { redirect } from "next/navigation";
import { BookingFormSchema } from "../app/lib/rules";
import getAuthUser from "../app/lib/getAuthUser";
import { ObjectId } from "mongodb";

export async function createBooking(state, formData) {
  const user = await getAuthUser();
  if (!user) return redirect("/");

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

  const bookingCollection = await getCollection("bookings");

  if (!bookingCollection) {
    return { errors: { database: "Network Issue or Server issue!" } };
  }

  const results = await bookingCollection.insertOne({
    userId: ObjectId.createFromHexString(user.userId),
    from,
    to,
    date,
    time,
    status: "Pending",
    createdAt: new Date(),
  });

  console.log(results, "created bookings successfully");

  // redirect("/dashboard");
}
