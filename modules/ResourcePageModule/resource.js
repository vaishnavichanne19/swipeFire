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

const ResourceUserSchema = new mongoose.Schema({
  username : String,
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const ResourceData = mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
export const ResourceUserData =  mongoose.models.ResourceUser || mongoose.model("ResourceUser", ResourceUserSchema)