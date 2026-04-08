import { NextResponse } from "next/server";
import cloudinary from "../../../../../../lib/cloudinary";
import { connectDB } from "../../../../../../lib/db";
import { ApplicationData } from "../../../../../../modules/HomePageModule/ApplicationSec";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await ApplicationData.findById(slugid);

    if (!SingleData) {
      return NextResponse.json({ message: "User Data Not Found" });
    }
    return NextResponse.json(
      { success: true, data: SingleData },
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

    const contentType = req.headers.get("content-type");
    let updatedPayload = {};

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      if (formData.get("heading")) {
        updatedPayload.heading = formData.get("heading");
      }

      const description = formData.get("description");

      if (
        description !== null &&
        description !== undefined &&
        description !== "undefined"
      ) {
        updatedPayload.description = description;
      }

      const guidelinepoint = formData.get("guidelinepoint");

      if (
        guidelinepoint !== null &&
        guidelinepoint !== undefined &&
        guidelinepoint !== "undefined"
      ) {
        updatedPayload.guidelinepoint = JSON.parse(guidelinepoint);
      }

      const file = formData.get("applicationimage");

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "Application Img" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        updatedPayload.applicationimage = uploadResult.secure_url;
      }
    } else {
      const body = await req.json();
      updatedPayload = { ...body };
    }

    const updatedData = await ApplicationData.findByIdAndUpdate(
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
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { slugid } = await params;

    const existdata = await ApplicationData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await ApplicationData.findByIdAndDelete(slugid);
    return NextResponse.json(
      { success: "true", message: "Data Deleted Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: "false", message: "Server Error" });
  }
}
