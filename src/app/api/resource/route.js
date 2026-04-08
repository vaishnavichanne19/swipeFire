import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import { ResourceData } from "../../../../modules/ResourcePageModule/resource";
import fs from "fs";
import path from "path";

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();

    const heading = formData.get("heading");
    const description = formData.get("description");
    const resourcetype = formData.get("resourcetype");
    const youtubeLink = formData.get("youtubeLink");

    const datas = {
      heading,
      description,
      resourcetype,
    };

    /* ================= IMAGE (Certificates) ================= */

    if (resourcetype === "Certificates") {
      const image = formData.get("image");

      if (image && image.name) {
        const buffer = Buffer.from(await image.arrayBuffer());

        const upload = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "resources", resource_type: "image" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        datas.image = upload.secure_url;
      }
    }

    /* ================= VIDEO ================= */

    if (resourcetype === "Videos") {
      const videoFile = formData.get("video");

      if (videoFile && videoFile.name) {
        const buffer = Buffer.from(await videoFile.arrayBuffer());

        const upload = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "resources",
                resource_type: "video",
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        datas.video = upload.secure_url;
      }

      if (youtubeLink) {
        datas.youtubeLink = youtubeLink;
      }
    }

    /* ================= PDF ================= */

  if (resourcetype === "PDF's") {
  const pdf = formData.get("pdf");

  if (pdf && pdf.name) {
    const bytes = await pdf.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + "-" + pdf.name; // unique name
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    datas.pdf = fileUrl; // ⭐ store URL in object
  }
}

    /* ================= SAVE ================= */

    const savedData = await ResourceData.create(datas);

    return NextResponse.json({
      success: true,
      message: "Data Added Successfully",
      data: savedData,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const alldata = await ResourceData.find();
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
