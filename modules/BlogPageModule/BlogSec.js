import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    heading: String,
    blogimage: String,
    subheading: String,
    description: String,
})

const BlogDetailSchema = new mongoose.Schema({
    heading: String,
    blogimg: String,
    date: {
  type: Date,
  default: Date.now,
},
    description: String,
    blogtype: {
    type: [String],
    enum: [
      "All Blog",
      "Fire Prevention Tips",
      "Fire Extinguishers Guide",
      "Fire Alarm System",
      "Maintenance & Inspection",
      "Industrial Fire Safety",
    ],
    required: true,
    default: ["All Blog"],
  },
  blogdetail: String,
})

export const BlogData = mongoose.models.BlogData || mongoose.model("BlogData", BlogSchema);
export const BlogDetailData = mongoose.models.BlogDetailData || mongoose.model("BlogDetailData", BlogDetailSchema);