import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { ProductTypeData } from "../../../../../modules/ProductPageModule/Product";

export async function POST(req) {
  await connectDB();

  try {
    const FormData = await req.formData();
    const prodtype = JSON.parse(FormData.get("prodtype"));

    const result = await ProductTypeData.updateOne(
      {}, 
      {
        $addToSet: {
          prodtype: { $each: prodtype }, 
        },
      },
      {
        upsert: true, 
      }
    );

    return NextResponse.json({
      success: true,
      message: "Product Type Added Successfully",
      data: result,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function GET() {
  try {
    await connectDB();
   const alldata = await ProductTypeData.find().populate("prodtype");
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
