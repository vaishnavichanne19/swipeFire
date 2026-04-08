import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  productimage1: String,
  productimage2: String,
  productimage3: String,
  productimage4: String,
  description: String,
  points: String,
});

const ProductListSchema = new mongoose.Schema({
  heading: String,
  productimage: String,
  description: String,
  features: String,
  certificate: [],
  productpdf: String,
  prodtable: String,
  applicationtype: [],
});

const ProductTypeSchema = new mongoose.Schema({
  prodtype: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductList",
    },
  ],
});

const BestSellingProductSchema = new mongoose.Schema({
  sellproductlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductList",
    },
  ],
});
export const ProductData =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const ProductListData =
  mongoose.models.ProductList ||
  mongoose.model("ProductList", ProductListSchema);
export const ProductTypeData =
  mongoose.models.ProductType ||
  mongoose.model("ProductType", ProductTypeSchema);
export const BestSellingProductData =
  mongoose.models.BestSellingProduct ||
  mongoose.model("BestSellingProduct", BestSellingProductSchema);
