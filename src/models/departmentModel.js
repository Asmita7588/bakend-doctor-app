import { Schema, default as mongoose } from "mongoose";

const departmentSchema = new Schema(
    {       
        name :{
            type : String,
            required : true,
        },
        // image :{
        //     type : Buffer,
        //     required : true,
        // },
        // imageContentType: { 
        //     type: String
        // },
        imageUrl : {
         type: String,
         required : true,   
        },
        description :{
            type : String,
            required : true,
        },
        isActive :{
            type : Boolean,
            required : true,
            default: true
        },
    },
    {
        timestamps : true
    }

);

const Department = mongoose.model("Department", departmentSchema);

export default Department;