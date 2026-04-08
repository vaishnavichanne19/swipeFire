import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import cloudinary from "../../../../../lib/cloudinary";
import fs from "fs";
import path from "path";
import { ProductListData } from "../../../../../modules/ProductPageModule/Product";

export async function POST(req) {
  await connectDB();

  try {
    const FormData = await req.formData();

    const datas = {
      heading: FormData.get("heading"),
      features: FormData.get("features"),
      prodtable: FormData.get("prodtable"),
      description: FormData.get("description"),
      certificate: FormData.getAll("certificate"),
      applicationtype: FormData.getAll("applicationtype"),
    };

    const prodpdf = FormData.get("productpdf");

    if (prodpdf && prodpdf.name) {
      const bytes = await prodpdf.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + prodpdf.name;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/uploads/${fileName}`;

      datas.productpdf = fileUrl;
    }

    const file = FormData.get(`productimage`);
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Product List Img" }, (err, res) =>
            err ? reject(err) : resolve(res),
          )
          .end(buffer);
      });

      datas[`productimage`] = upload.secure_url;
    }

    await ProductListData.create(datas);
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
    const alldata = await ProductListData.find();
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
