// import { findOne, create } from '../models/user.model';
import User from "../models/userModel.js";
import { genSalt, hash } from "bcryptjs";

export async function registerUser(userData) {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(userData.password, salt);
  // console.log("Hashed Password to be saved:", hashedPassword);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

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
