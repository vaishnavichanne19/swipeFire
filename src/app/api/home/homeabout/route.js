import { NextResponse } from "next/server";
import { HomeAboutData } from "../../../../../modules/HomePageModule/HomeAbout";
import { connectDB } from "../../../../../lib/db";
import cloudinary from "../../../../../lib/cloudinary";

export  async function POST(req) {
  await connectDB();

  try {
  const FormData = await req.formData();

  const datas = {
   heading : FormData.get("heading"),
   description : FormData.get("description")
}


  const file = FormData.get(`homeaboutimage`);
  if (file && file.name) {           
    const buffer = Buffer.from(await file.arrayBuffer()); 


    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({folder: "Home About Img"}, (err, res) =>  
      err ? reject(err) : resolve(res)
   )  
   .end(buffer)  
    });

    datas[`homeaboutimage`] = upload.secure_url;
  }


await HomeAboutData.create(datas);
return NextResponse.json({success: true, message:"Data Added Successfully", data: datas})
} catch (error) {
  console.error(error);
  return NextResponse.json({success: false, message: "Server Error"})
  
}
}

export async function GET() {
  try {
    await connectDB();
    const alldata = await HomeAboutData.find();
    if (!alldata) {
      return NextResponse.json({message:"Data Not Found"})
    }
    return NextResponse.json({ success: true, message:"Get All Data", data: alldata,})
  } catch (error) {
     console.error(error);
    return NextResponse.json({ message: "Server Error" });
  }
}

