import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import cloudinary from "../../../../../lib/cloudinary";
import { BlogData } from "../../../../../modules/BlogPageModule/BlogSec";

export async function POST(req) {
  await connectDB();

  try {
    const FormData = await req.formData();

    const datas = {
      heading: FormData.get("heading"),
      // subheading: FormData.get("subheading"),
      description: FormData.get("description"),
    };

    const file = FormData.get(`blogimage`);
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Blog Img" }, (err, res) =>
            err ? reject(err) : resolve(res),
          )
          .end(buffer);
      });

      datas[`blogimage`] = upload.secure_url;
    }

    await BlogData.create(datas);
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
    const alldata = await BlogData.find();
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
