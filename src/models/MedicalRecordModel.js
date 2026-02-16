/* eslint-disable no-undef */
import { Schema } from "mongoose";

const medicalRecordSchema = new Schema(
    {
        patientId : {
        type : Schema.Types.ObjectId,
         ref : "patient",
         required : true,
        },
        doctorId : {
        type : Schema.Types.ObjectId,
         ref : "Doctor",
         required : true,
        },
        diagnosis : {
            type : Number,
            required : true
        },
        prescriptions : {
            type : String,
            required: true
        },
         note : {
            type : String,
            required: true
        },
    },{
        timestamps : true
    }
) 
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
