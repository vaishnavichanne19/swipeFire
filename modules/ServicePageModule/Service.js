import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  heading: String,
  serviceimage: String,
  description: String,
});

const ServiceListSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  description: String,
  points: String,
});

const OurPrioritySchema = new mongoose.Schema({
  title: String,
  heading: String,
  description: String,
});

const FireDetectionSchema = new mongoose.Schema({
  heading: String,
  description: String,
});

const AmcSchema = new mongoose.Schema({
  heading: String,
  description: String,
  points: String,
});

const SystemSchema = new mongoose.Schema({
  heading: String,
  para: String,
  description: String,
  systemtype: {
    type: [String],
    enum: [
      "All",
      "Active Fire Protection",
      "Passive Fire Protection",
      "Fire Suspension Systems",
      "Water Curtain Systems",
    ],
    required: true,
    default: ["All"],
  },
  points: String,
});

export const ServiceData =
  mongoose.models.ServiceData || mongoose.model("ServiceData", ServiceSchema);
export const ServiceList =
  mongoose.models.ServiceList ||
  mongoose.model("ServiceList", ServiceListSchema);
export const OurPriorityData =
  mongoose.models.OurPriority ||
  mongoose.model("OurPriority", OurPrioritySchema);
export const FireDetectionData =
  mongoose.models.FireDetection ||
  mongoose.model("FireDetection", FireDetectionSchema);
export const AmcData =
  mongoose.models.AmcData || mongoose.model("AmcData", AmcSchema);
export const SystemData =
  mongoose.models.SystemInt || mongoose.model("SystemInt", SystemSchema);
