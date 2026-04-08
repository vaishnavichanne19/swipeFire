import mongoose from "mongoose";

const HeroSecSchema = new mongoose.Schema({
    heading: String,
    description: String,
})

export const HeroSecData = mongoose.models.Herosection || mongoose.model("Herosection", HeroSecSchema);
