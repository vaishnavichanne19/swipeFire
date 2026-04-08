import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    heading: String,
    description: String,
    image: String,
    pdf: String,
    video: String,
    youtubeLink: String,
    resourcetype: {
    type: [String],
    enum: [
      "PDF's",
      "Videos",
      "Certificates",
    ],
    required: true,
  },
})

export const ResourceData = mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
