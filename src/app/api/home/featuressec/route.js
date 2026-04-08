import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { FeaturesSecData } from "../../../../../modules/HomePageModule/FeaturesSec";


export  async function POST(req) {
  await connectDB();

  try {
  const {heading, subheading, description} = await req.json();

  const datas = new FeaturesSecData({
    heading,
    subheading,
    description
  })

await datas.save();
return NextResponse.json({success: true, message:"Data Added Successfully", data: datas})
} catch (error) {
  console.error(error);
  return NextResponse.json({success: false, message: "Server Error"})
  
}
}

export async function GET() {
  try {
    await connectDB();
    const alldata = await FeaturesSecData.find();
    if (!alldata) {
      return NextResponse.json({message:"Data Not Found"})
    }
    return NextResponse.json({ success: true, message:"Get All Data", data: alldata,})
  } catch (error) {
     console.error(error);
    return NextResponse.json({ message: "Server Error" });
  }
}

