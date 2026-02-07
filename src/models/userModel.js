import { Schema, default as mongoose, model } from "mongoose";
import { type } from "node:os";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT"],
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    isVerified: {
        type: Boolean,
        default: false, 
    },
    otp: {
        type: String, 
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
