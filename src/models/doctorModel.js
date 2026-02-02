import { Schema, default as mongoose, model } from "mongoose";
import { type } from "node:os";

const doctorSchema = new Schema(
    {
        userId : {
         type : Schema.Types.ObjectId,
         ref : "User",
         required : true

        },  
         departmentId : {
         type : Schema.Types.ObjectId,
         ref : "Department",
         required : true,

        },     
        speciality :{
            type : String,
            required : true,
        },
        qualification :{
            type : String,
            required : true,
        },
        experience :{
            type : Number,
            required : true,
        },
        consultantFees :{
            type : Number,
            required : true,
        },
    },
    {
        timestamps : true
    }

);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;