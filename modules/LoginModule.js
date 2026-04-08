import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true},
  password: String,
});
export default mongoose.models.Login || mongoose.model("Login", UserSchema);
