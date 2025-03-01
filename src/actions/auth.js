"use server";

import { LoginFormSchema, RegisterFormSchema } from "../app/lib/rules";
import { getCollection } from "../app/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "../app/lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    schoolId: formData.get("schoolId"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { name, email, password, schoolId } = validatedFields.data;
  const userCollection = await getCollection("users");

  if (!userCollection) {
    return { errors: { email: "Network Issue or Server issue!" } };
  }

  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    return { errors: { email: "Email already exist in our Database!" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const results = await userCollection.insertOne({
    name,
    email,
    password: hashedPassword,
    schoolId,
  });

  await createSession(results.insertedId.toString());

  redirect("/dashboard");
}

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) {
    console.error("Database connection failed!");
    return { errors: { email: "Network Issue or Server issue!" } };
  }

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { email: "Invalid credentials." } };

  await createSession(existingUser._id.toString());

  console.log(existingUser);

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
