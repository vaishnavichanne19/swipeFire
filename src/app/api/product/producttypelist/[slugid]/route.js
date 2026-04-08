import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { ProductTypeData } from "../../../../../../modules/ProductPageModule/Product";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await ProductTypeData.findOne({ prodtype: slugid}).populate("prodtype");

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


export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { slugid } = await params;

    await ProductTypeData.updateOne(
      {},
      { $pull: { prodtype: slugid } }
    );

    return NextResponse.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}