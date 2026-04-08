import { NextResponse } from "next/server";
import cloudinary from "../../../../../../lib/cloudinary";
import { connectDB } from "../../../../../../lib/db";
import { ProductData } from "../../../../../../modules/ProductPageModule/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await ProductData.findById(slugid);

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


    if (formData.get("heading"))
      updatedPayload.heading = formData.get("heading");

    if (formData.get("description"))
      updatedPayload.description = formData.get("description");

const subheading = formData.get("subheading");
const points = formData.get("points");

if (subheading !== null && subheading !== "undefined") {
  updatedPayload.subheading = subheading;
}

if (points !== null && points !== "undefined") {
  updatedPayload.points = points;
}
    const imageFields = ["productimage1", "productimage2", "productimage3", "productimage4"];

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "Product Img" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        updatedPayload[field] = uploadResult.secure_url;
      }
    } 
  } else {
      const body = await req.json();
      updatedPayload = { ...body };
    }

    const updatedData = await ProductData.findByIdAndUpdate(
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
