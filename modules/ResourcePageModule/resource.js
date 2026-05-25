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


const ConsultantSchema = new mongoose.Schema({
  heading : String,
  description : String,
  designpoints: String,
  checkpoints: String,
})

const MachinerySchema = new mongoose.Schema({
  heading: String,
  description: String,
  category: String,
  items: String,
})

export const ResourceData = mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
export const ResourceUserData =  mongoose.models.ResourceUser || mongoose.model("ResourceUser", ResourceUserSchema)
export const ConsultantData = mongoose.models.Consultant || mongoose.model("Consultant", ConsultantSchema)
export const MachineryData = mongoose.models.Machinery || mongoose.model("Machinery", MachinerySchema)
