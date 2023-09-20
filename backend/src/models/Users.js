import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  isteacher: { type: Boolean, required: true },
  course: { type: String },
});

export const UserModel = mongoose.model("users", UserSchema);
