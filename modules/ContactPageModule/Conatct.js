import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    heading: String,
    subheading: String,
    description: String,
    branchname: String,
    branchaddress: String,
    // branchphone: String,
    // branchemail: String,
})

const ContactFormSchema = new mongoose.Schema({
    name: String,
    // lastname: String,
    // email: String,
    phone: String,
    // message: String,
    branch: String,
})



export const ContactData = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export const ContactFormData = mongoose.models.ContactForm || mongoose.model("ContactForm", ContactFormSchema);
