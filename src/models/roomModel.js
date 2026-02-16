import { Schema, default as mongoose } from "mongoose";


const roomSchema = new Schema(
    {
        roomNumber : {
              type : Number,
            required : true
        },
        roomType : {
             type : String,
            enum:["GENERAL", "ICU","PRIVATE", "SEMI_PRIVATE"],
            required : true
        },
        floor : {
            type : Number,
            required : true
        },
        dailyCharges : {
            type : Number,
            required: true
        },
        isOccupied :{
            type :Boolean,
            required : true,
             default : false,
        }
    },{
        timestamps : true
    }
) 
const Room = mongoose.model("Room", roomSchema);

export default Room;
