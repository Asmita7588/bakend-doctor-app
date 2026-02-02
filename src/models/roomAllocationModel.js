import { Schema, default as mongoose, model } from "mongoose";
import { type } from "node:os";

const RoomAllocationSchema = new Schema(
    {
        patientId : {
         type : Schema.Types.ObjectId,
         ref : "Patient",
         required : true,
         unique : true

        },  
         roomId : {
         type : Schema.Types.ObjectId,
         ref : "Room",
         required : true,
         unique : true

        },     
         userId : {
         type : Schema.Types.ObjectId,
         ref : "User",
         required : true,
         unique : true

        },  
        startDate :{
            type : String,
            required : true,
        },
        endDate :{
            type : String,
            required : true,
        },
        status :{
            type : String,
            enum : ["ACTIVE", "COMPLETED"],
            required : true,
        },
    },
    {
        timestamps : true
    }

);

const RoomAllocation = mongoose.model("RoomAllocation", RoomAllocationSchema);

export default RoomAllocation;