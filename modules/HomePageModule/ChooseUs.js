import mongoose from "mongoose";

const ChooseusSecSchema = new mongoose.Schema({
    heading: String,
    description: String,
})

export const ChooseusSecData = mongoose.models.Chooseus || mongoose.model("Chooseus", ChooseusSecSchema);
