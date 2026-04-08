import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
    heading: String,
    aboutimage: String,
    description: String,
})

const ProductionSchema = new mongoose.Schema({
    heading: String,
    number: String,
})
const WhatwedoSchema = new mongoose.Schema({
    heading: String,
})

const manufactureSchema = new mongoose.Schema({
    heading: String,
    description: String,
})

const corevalueSchema = new mongoose.Schema({
    heading: String,
    description: String,
})

export const AboutData = mongoose.models.About || mongoose.model("About", AboutSchema);
export const ProductionData = mongoose.models.Production || mongoose.model("Production", ProductionSchema);
export const WhatwedoData = mongoose.models.Whatwedo || mongoose.model("Whatwedo", WhatwedoSchema);
export const ManufactureData = mongoose.models.Manufacture || mongoose.model("Manufacture", manufactureSchema);
export const CorevalueData = mongoose.models.Corevalue || mongoose.model("Corevalue", corevalueSchema);