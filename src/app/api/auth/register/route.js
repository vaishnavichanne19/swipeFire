import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import LoginModule from "../../../../../modules/LoginModule";
import { connectDB } from "../../../../../lib/db";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await LoginModule.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await LoginModule.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
