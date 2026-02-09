import Appointment from "../models/AppointmentModel.js"
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Department from '../models/departmentModel.js';

export const createAppointment = async (Data) => {
       console.log('patientID', Data)
       console.log('Data.patientId', Data.patientId)
    const patientId = Data.patientId
     const doctorId = Data.doctorId;
      const departmentId = Data.departmentId;
       const appointmentDate = Data.appointmentDate;
   
        const [patientExists, doctorExists, departmentExists] = await Promise.all([
            Patient.exists({ _id: patientId }),
            Doctor.exists({ _id: doctorId }),
            Department.exists({ _id: departmentId })
        ]);
     if (!patientExists) throw new Error("Patient not found");
    if (!doctorExists) throw new Error("Doctor not found");
    if (!departmentExists) throw new Error("Department not found");

        const dateParts = Data.appointmentDate.split('/');
        const selectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const today = new Date();
         today.setHours(0, 0, 0, 0);
       
        console.log("appointmentDate",appointmentDate);
         console.log("today",today)
       if (selectedDate < today) {
        throw new Error("You cannot book an appointment for a past date.");
    }
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