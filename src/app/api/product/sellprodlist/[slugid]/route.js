import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import { BestSellingProductData } from "../../../../../../modules/ProductPageModule/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slugid } = await params;
    // console.log(slugid)

    const SingleData = await BestSellingProductData.findOne({ sellproductlist: slugid}).populate("sellproductlist");

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

    await BestSellingProductData.updateOne(
      {},
      { $pull: { sellproductlist: slugid } }
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