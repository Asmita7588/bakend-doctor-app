import { Schema, default as mongoose, model } from "mongoose";

const receptionistSchema = new Schema(
    {
         userId : {
         type : Schema.Types.ObjectId,
         ref : "User",
         required : true,
         unique : true

        },
         shift :{
          type : String,
          required : true,
       }, 
        deskNumber :{
          type : Number,
          required : true,
       }, 

    },
    {
        timestamps : true
    }

    
);

const Receptionist = mongoose.model("Receptionist", receptionistSchema);

export default Receptionist;