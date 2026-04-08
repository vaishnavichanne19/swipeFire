import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { CorevalueData } from "../../../../../../modules/AboutPageModule/AboutSec";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const getdata = await CorevalueData.findById(slugid);

    if (!getdata) {
      return NextResponse.json({ message: "User Data Not Found" });
    }
    return NextResponse.json(
      { success: true, data: getdata },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;

    const { heading, description } =
      await req.json();

    const updatedPayload = {
      heading,
      description,
    };

    const existid = await CorevalueData.findById(slugid);

    if (!existid) {
      return NextResponse.json({ message: "User Not Found" });
    }

    const updatedData = await CorevalueData.findByIdAndUpdate(
      slugid,
      { $set: updatedPayload },
      { new: true },
    );

    return NextResponse.json({
      success: true,
      message: "Data Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { slugid } = await params;

    const existdata = await CorevalueData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await CorevalueData.findByIdAndDelete(slugid);
    return NextResponse.json(
      { success: "true", message: "Data Deleted Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: "false", message: "Server Error" });
  }
}