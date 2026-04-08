import mongoose from "mongoose";

const TestimonialSecSchema = new mongoose.Schema({
    heading: String,
    description: String,
})

export const TestimonialSecData = mongoose.models.Testimonialsection || mongoose.model("Testimonialsection", TestimonialSecSchema);
