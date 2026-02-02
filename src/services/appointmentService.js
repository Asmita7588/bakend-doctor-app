import Appointment from "../models/AppointmentModel.js"


export const createAppointment = async (Data) => {
    return await Appointment.create(Data);
};


export const getAllAppointments = async () => {
    return await Appointment.find();
};


export const getAppointmentById = async (id) => {
    return await Appointment.findById(id);
};

export const updateAppointment = async (id, updateData) => {
    return await Appointment.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
};