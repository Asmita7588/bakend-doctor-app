import Patient from "../models/patientModel.js";

export const createPatient = async (data) => {
    return await Patient.create(data);
}

export const getAllPatients = async () => {
  return await Patient.find().populate("userId");
}

export const getPatientById = async (id) =>{
    return await Patient.findById(id).populate("userId");
}

export const updatePatient = async (id, updateData) => {
    return await Patient.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    }).populate("userId");
};

export const deletePatient = async (id) =>
{ 
   return await Patient.findByIdAndDelete(id);
}