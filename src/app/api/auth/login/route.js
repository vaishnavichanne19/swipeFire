import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import LoginModule from "../../../../../modules/LoginModule";
import { connectDB } from "../../../../../lib/db";
import { signToken } from "../../../../../lib/jwt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await LoginModule.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password Not Match" },
        { status: 401 },
      );
    }

    const token = signToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    return NextResponse.json({
      success: true,
      message: "Login Successfull",
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

