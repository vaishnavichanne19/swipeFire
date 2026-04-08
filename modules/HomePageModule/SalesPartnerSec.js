import mongoose from "mongoose";


const SalesPartnerSchema = new mongoose.Schema({
    heading: String,
    description: String,
    productimg: String,
})

export const SalesPartnerData = mongoose.models.SalesPartner || mongoose.model("SalesPartner", SalesPartnerSchema);