import mongoose from "mongoose";

const EquipmentSecSchema = new mongoose.Schema({
    heading: String,
    suffix: String,
    description: String,
})

export const EquipmentSecData = mongoose.models.Equipment || mongoose.model("Equipment", EquipmentSecSchema);
