import mongoose from "mongoose";

const FeaturesSecSchema = new mongoose.Schema({
    heading: String,
    subheading: String,
    description: String,
})

export const FeaturesSecData = mongoose.models.Features || mongoose.model("Features", FeaturesSecSchema);
