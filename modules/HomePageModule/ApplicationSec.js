import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  heading: {
    type: String,
    trim: true,
  },
  applicationimage: String,
  description: String,
  guidelinepoint: [
    {
      guidelineheading: String,
      guidelinedesc: String,
    },
  ],
});

export const ApplicationData =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
