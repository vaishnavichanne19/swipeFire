import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { SystemData } from "../../../../../modules/ServicePageModule/Service";

export async function POST(req) {
  await connectDB();
  try {
    const { heading, points, para, description, systemtype } = await req.json();

    const datas = new SystemData({
      heading,
      description,
      para,
      systemtype: Array.isArray(systemtype) ? systemtype[0] : systemtype, // ✅ safety check
      points,
    });

    await datas.save();
    return NextResponse.json({
      success: true,
      message: "Data Added Successfully",
      data: datas,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}

export async function GET() {
  try {
    await connectDB();
    const alldata = await SystemData.find();
    if (!alldata) {
      return NextResponse.json({ message: "Data Not Found" });
    }
    return NextResponse.json({
      success: true,
      message: "Get All Data",
      data: alldata,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" });
  }
}
