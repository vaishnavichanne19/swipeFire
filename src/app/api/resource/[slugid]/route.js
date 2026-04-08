import { NextResponse } from "next/server";
import cloudinary from "../../../../../lib/cloudinary";
import { connectDB } from "../../../../../lib/db";
import { ResourceData } from "../../../../../modules/ResourcePageModule/resource";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await ResourceData.findById(slugid);

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

    const formData = await req.formData();
    const updatedPayload = {};

    /* -------- TEXT FIELDS -------- */

    const heading = formData.get("heading");
    const description = formData.get("description");
    const youtubeLink = formData.get("youtubeLink");

    if (heading) updatedPayload.heading = heading;
    if (description) updatedPayload.description = description;

if (typeof youtubeLink === "string" && youtubeLink.trim() !== "") {
  updatedPayload.youtubeLink = youtubeLink.trim();
}
    /* -------- FILE FIELDS -------- */

   const fileFields = ["image", "video", "pdf"];

for (const field of fileFields) {
  const file = formData.get(field);

  if (file && file.size > 0) {

    /* ---------- PDF STORE IN LOCAL FOLDER ---------- */

    if (field === "pdf") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      updatedPayload.pdf = `/uploads/${fileName}`;
    }

    /* ---------- IMAGE / VIDEO → CLOUDINARY ---------- */

    else {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "resources",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      updatedPayload[field] = uploadResult.secure_url;
    }
  }
}

    /* -------- UPDATE DATABASE -------- */

    const updatedData = await ResourceData.findByIdAndUpdate(
      slugid,
      { $set: updatedPayload },
      { new: true }
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
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { slugid } = await params;

    const existdata = await ResourceData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await ResourceData.findByIdAndDelete(slugid);
    return NextResponse.json(
      { success: "true", message: "Data Deleted Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: "false", message: "Server Error" });
  }
}