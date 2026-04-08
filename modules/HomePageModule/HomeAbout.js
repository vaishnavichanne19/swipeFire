import mongoose from "mongoose";

const HomeAboutSchema = new mongoose.Schema({
    heading: String,
    homeaboutimage: String,
    description: String,
})

export const HomeAboutData = mongoose.models.HomeAbout || mongoose.model("HomeAbout", HomeAboutSchema);
