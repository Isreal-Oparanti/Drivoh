import { NextResponse } from "next/server";
import getAuthUser from "../../../lib/getAuthUser";
import { getCollection } from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const userSession = await getAuthUser(req);

    if (!userSession || !userSession.userId) {
      console.log("1", user.userId);

      return Response.json({ users: [] }, { status: 200 });
    }

    const usersCollection = await getCollection("users");

    const user = await usersCollection.findOne(
      { _id: new ObjectId(userSession.userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Authenticated User:", user);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
