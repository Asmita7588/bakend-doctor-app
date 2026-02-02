import Receptionist from "../models/receptionistModel.js";

export const createReceptionist = async (data) =>
{
     const recepData = await Receptionist.create(data);
     return recepData;
}

export const getAllReceptionists = async () => 
{
   return await Receptionist.find().populate("userId");
}

export const getReceptionistById = async (id) =>
{
   return await Receptionist.findById(id).populate("userId");
}

export const updateReceptionist = async (id, updateData) => {
    return await Receptionist.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    }).populate("userId");
};

export const deleteReceptionist = async (id) => 
{
    return await Receptionist.findByIdAndDelete(id);
}