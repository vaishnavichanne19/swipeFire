import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    heading: String,
    certificateimage: String,
    description: String,
})

export const CertificateData = mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
