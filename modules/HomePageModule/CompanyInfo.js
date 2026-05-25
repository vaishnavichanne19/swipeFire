import mongoose from "mongoose";


const CompanyInfoSchema = new mongoose.Schema({
    orgName: String,
    address: String,
    branches: String,
    mfsno: String,
    panno: String,
    gstno:String,
    email:String,
    contact_persoon_name:String,
})

export const CompanyInfoData = mongoose.models.Companyinfo || mongoose.model("Companyinfo", CompanyInfoSchema);