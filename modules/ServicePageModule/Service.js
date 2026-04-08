import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    heading: String,
    serviceimage: String,
    description: String,
})

const ServiceListSchema = new mongoose.Schema({
    heading: String,
    subheading: String,
    description: String,
    points:String,
})

export const ServiceData = mongoose.models.ServiceData || mongoose.model("ServiceData", ServiceSchema);
export const ServiceList = mongoose.models.ServiceList || mongoose.model("ServiceList", ServiceListSchema);
