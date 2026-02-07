// import { findOne, create } from '../models/user.model';
import User from "../models/userModel.js";
import { genSalt, hash } from "bcryptjs";
import { sendToQueue } from "../config/rabbitMq.js"
import {logger} from "../config/logger.js"

export async function registerUser(userData) {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(userData.password, salt);
  // console.log("Hashed Password to be saved:", hashedPassword);
  // to generate otp
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const newUser = await User.create({
    ...userData,
    otp:otp,
    otpExpires:new Date(Date.now() + 10 * 60 * 1000),
    password: hashedPassword,
    isVerified: false
  });

//inform rabbitmq to handle email
console.log("gdifujfh",userData.email)
logger.info("queuing the mail--")
  sendToQueue('email_queue', {
        email: userData.email,
        otp: otp
    });
    logger.info("verification email queued")
  return newUser;
}

export async function getUser(email) {
  const user = await User.findOne({ email }).select('+password');
  return user;
}
export async function getUserbyId(id) {
  const user = await User.findById(id).select('+password');
  return user;
}

export const getAllUsers = async () => {
    return await User.find().select('+password');;
};

export const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const verifyUserEmail = async (email, submittedOtp) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    if (user.isVerified) throw new Error("User is already verified");
    if (user.otp !== submittedOtp) throw new Error("Invalid OTP");
    if (user.otpExpires < Date.now()) throw new Error("OTP has expired");

    //update user
    user.isVerified = true;
    user.otp = null;        
    user.otpExpires = null; 
    await user.save();

    return user;
};
