import { Schema, default as mongoose, model } from "mongoose";

const invoiceSchema = new Schema(
    {
        patientId : {
        type : Schema.Types.ObjectId,
         ref : "Patient",
         required : true,
        },
        paymentId : {
        type : Schema.Types.ObjectId,
         ref : "Payment",
         required : true,
        },
       items: [
    {
      label: {
        type: String,
        required: true,
        trim: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
        totalAmount : {
            type : Number
        },
        generatedBy : {
        type : Schema.Types.ObjectId,
         ref : "User",
         required : true,
        },
         issuedAt : {
            type : String,
            required: true
        },
    },{
        timestamps : true
    }
) 
invoiceSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((sum, item) => {
        return sum + item.amount;
    }, 0);
    
    next();
});
const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
