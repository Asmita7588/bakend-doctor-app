import Payment from "../models/PaymentModel.js"


export const createPayment= async (Data) => {
    return await Payment.create(Data);
};


export const getAllPayment = async () => {
    return await Payment.find();
};


export const getPaymentById = async (id) => {
    return await Payment.findById(id);
};

export const updatePayment = async (id, updateData) => {
    return await Payment.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deletePayment = async (id) => {
    return await Payment.findByIdAndDelete(id);
};