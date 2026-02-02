import { Schema, default as mongoose, model } from "mongoose";

const patientSchema = new Schema(
    {
        userId : {
         type : Schema.Types.ObjectId,
         ref : "User",
         required : true,
         unique : true
        },
         dob :{
          type : String,
          required : true,
       }, 
       age :{
          type : Number,
          required : true,
       }, 
       bloodGroup :{
          type : String,
          required : true,
       }, 
       address :{
          type : String,
          required : true,
       }, 
       emergencyContact :{
          type : String,
          required : true,
       }, 
       medicalHistory :{
          type : String,
          required : true,
       }
    },
    {
        timestamps : true
    }

);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;