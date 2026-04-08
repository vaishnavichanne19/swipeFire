import { NextResponse } from "next/server";
import cloudinary from "../../../../../../lib/cloudinary";
import { connectDB } from "../../../../../../lib/db";
import { ProductListData } from "../../../../../../modules/ProductPageModule/Product";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await ProductListData.findById(slugid);

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

    const heading = formData.get("heading");
    if (heading) updatedPayload.heading = heading;

    const description = formData.get("description");

    if (
      description !== null &&
      description !== undefined &&
      description !== "undefined"
    ) {
      updatedPayload.description = description;
    }

    const features = formData.get("features");

    if (
      features !== null &&
      features !== undefined &&
      features !== "undefined"
    ) {
      updatedPayload.features = features;
    }

    const prodtable = formData.get("prodtable");

    if (
      prodtable !== null &&
      prodtable !== undefined &&
      prodtable !== "undefined"
    ) {
      updatedPayload.prodtable = prodtable;
    }

    // 🔹 Certificate (multiple)
    const certificates = formData.getAll("certificate");
    if (certificates.length > 0) {
      updatedPayload.certificate = certificates;
    }

    // 🔹 applicationtype (multiple)
    const applicationtype = formData.getAll("applicationtype");
    if (applicationtype.length > 0) {
      updatedPayload.applicationtype = applicationtype;
    }

    // 🔹 Product Image Upload
    const imageFile = formData.get("productimage");

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Product List Img" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      updatedPayload.productimage = uploadResult.secure_url;
    }

    // 🔹 PDF Upload
    const pdfFile = formData.get("productpdf");

    if (pdfFile && pdfFile.size > 0) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + pdfFile.name;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      updatedPayload.productpdf = `/uploads/${fileName}`;
    }

    const updatedData = await ProductListData.findByIdAndUpdate(
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

    const existdata = await ProductListData.findById(slugid);

    if (!existdata) {
      return NextResponse.json({ message: "User Not Found" });
    }

    await ProductListData.findByIdAndDelete(slugid);
    return NextResponse.json(
      { success: "true", message: "Data Deleted Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: "false", message: "Server Error" });
  }
}
