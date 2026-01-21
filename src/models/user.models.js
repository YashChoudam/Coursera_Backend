import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongooose.Schema;
const objectId = mongoose.objectId;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    coursePurchased: {
      type: objectId,
      trim: true,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User",userSchema);
export default userModel ;