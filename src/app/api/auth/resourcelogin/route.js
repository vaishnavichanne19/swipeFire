import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import { signToken } from "../../../../../lib/jwt";
import { ResourceUserData } from "../../../../../modules/ResourcePageModule/resource";

export async function POST(req) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await ResourceUserData.findOne({ phone });
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

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      phone: user.phone,
    }, process.env.JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: "Login Successfull",
      token,
      id: user._id,
      username: user.username,
      phone: user.phone,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

