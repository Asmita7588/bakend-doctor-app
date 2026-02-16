import { Schema, default as mongoose } from "mongoose";

const AppointmentSchema = new Schema(
    {
        patientId : {
         type : Schema.Types.ObjectId,
         ref : "Patient",
         required : true,
         unique : true

        },  
         doctorId : {
         type : Schema.Types.ObjectId,
         ref : "Doctor",
         required : true,
         unique : true
        },     
         departmentId : {
         type : Schema.Types.ObjectId,
         ref : "Department",
         required : true,
         unique : true

        },  
        appointmentDate :{
            type : Date,
            required : true,
        },
        status :{
            type : String,
            enum : ["BOOKED", "COMPLETED", "CANCELLED"],
            required : true,
        },
    },
    {
        timestamps : true
    }

);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;