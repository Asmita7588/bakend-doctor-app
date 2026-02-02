import Invoice from "../models/InvoiceModel.js"


export const createInvoice = async (roomData) => {
    return await Invoice.create(roomData);
};


export const getAllInvoices = async () => {
    return await Invoice.find();
};


export const getInvoiceById = async (id) => {
    return await Invoice.findById(id);
};

export const updateInvoice = async (id, updateData) => {
    return await Invoice.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteInvoice = async (id) => {
    return await Invoice.findByIdAndDelete(id);
};