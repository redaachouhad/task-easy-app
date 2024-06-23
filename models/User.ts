import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserCurrent =
  mongoose.models.UserCurrent || model("UserCurrent", UserSchema);

export default UserCurrent;
