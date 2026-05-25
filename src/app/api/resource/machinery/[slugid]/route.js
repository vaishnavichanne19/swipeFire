import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { MachineryData } from "../../../../../../modules/ResourcePageModule/resource";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const getdata = await MachineryData.findById(slugid);

    if (!getdata) {
      return NextResponse.json({ message: "User Data Not Found" });
    }
    return NextResponse.json({ success: true, data: getdata }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;

    const { heading, items,category,description } = await req.json();

    const updatedPayload = {
      heading,
      items,
      category,
      description,
    };

    const existid = await MachineryData.findById(slugid);

    if (!existid) {
      return NextResponse.json({ message: "User Not Found" });
    }

    const updatedData = await MachineryData.findByIdAndUpdate(
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
  try {
    await connectDB();
    const { slugid } = await params;

    const existid = await MachineryData.findById(slugid);

    if (!existid) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await MachineryData.findByIdAndDelete(slugid);

    return NextResponse.json({
      success: true,
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false,message: "Server Error" }, { status: 500 });
  }
}