import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { SalesPartnerData } from "../../../../../../modules/HomePageModule/SalesPartnerSec";
import cloudinary from "../../../../../../lib/cloudinary";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const getdata = await SalesPartnerData.findById(slugid);

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

    const formData = await req.formData();
    const updatedPayload = {};

    if (formData.get("heading"))
      updatedPayload.heading = formData.get("heading");

     const description = formData.get("description");

      if (
        description !== null &&
        description !== undefined &&
        description !== "undefined"
      ) {
        updatedPayload.description = description;
      }

    const imageFields = ["productimg"];

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "Sales Partner Img" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        updatedPayload[field] = uploadResult.secure_url;
      }
    }

    const updatedData = await SalesPartnerData.findByIdAndUpdate(
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