import { Schema, default as mongoose, model } from "mongoose";
import { type } from "node:os";

const paymentSchema = new Schema(
    {
        patientId : {
         type : Schema.Types.ObjectId,
         ref : "Patient",
         required : true,
         unique : true

        },  
         amount : {
         type : Number,
         required : true,

        },     
        paymentType : {
         type : String,
         enum : ["CASH","CARD", "UPI", "INSURANCE"],
         required : true,
     

        },  
        status :{
            type : String,
             enum : ["PENDING","PAID", "FAILED"],
            required : true,
        },
        paidAt :{
            type : String,
            required : true,
        }
    },
    {
        timestamps : true
    }

);

const payment = mongoose.model("Payment", paymentSchema);

export default payment;