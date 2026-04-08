import { NextResponse } from "next/server";
import cloudinary from "../../../../../../lib/cloudinary";
import { connectDB } from "../../../../../../lib/db";
import { BlogDetailData } from "../../../../../../modules/BlogPageModule/BlogSec";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const existdata = await BlogDetailData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Data Not Found" });
    }
    return NextResponse.json(
      { success: true, data: existdata },
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

    if (formData.get("description"))
      updatedPayload.description = formData.get("description");

    if (formData.get("blogdetail"))
      updatedPayload.blogdetail = formData.get("blogdetail");

    const imageFields = ["blogimg"];

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "Blog List Img" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        updatedPayload[field] = uploadResult.secure_url;
      }
    }

    const updatedData = await BlogDetailData.findByIdAndUpdate(
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

    const existdata = await BlogDetailData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await BlogDetailData.findByIdAndDelete(slugid);

    return NextResponse.json({
      success: true,
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}
