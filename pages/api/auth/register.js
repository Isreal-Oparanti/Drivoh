import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";


export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    await connectDB();
    const { name, email, password, schoolID, phone } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, schoolID, phone });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
