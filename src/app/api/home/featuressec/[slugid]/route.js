import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { FeaturesSecData } from "../../../../../../modules/HomePageModule/FeaturesSec";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const getdata = await FeaturesSecData.findById(slugid);

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

    const { heading, subheading, description } =
      await req.json();

    const updatedPayload = {
      heading,
      subheading,
      description,
    };

    const existid = await FeaturesSecData.findById(slugid);

    if (!existid) {
      return NextResponse.json({ message: "User Not Found" });
    }

    const updatedData = await FeaturesSecData.findByIdAndUpdate(
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

