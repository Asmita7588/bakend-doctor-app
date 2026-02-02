import Doctor from "../models/doctorModel.js"


export const createDoctor = async (doctorData) => {
    return await Doctor.create(doctorData);
};


export const getAllDoctors = async () => {
    return await Doctor.find().populate('userId');
};


export const getDoctorById = async (id) => {
    return await Doctor.findById(id).populate('userId');
};

export const updateDoctor = async (id, updateData) => {
    return await Doctor.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteDoctor = async (id) => {
    return await Doctor.findByIdAndDelete(id);
};