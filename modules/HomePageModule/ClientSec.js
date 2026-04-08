import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    heading: String,
    clientimage: String,
    description: String,
})

export const ClientData = mongoose.models.Client || mongoose.model("Client", ClientSchema);
