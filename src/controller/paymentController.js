import * as paymentService from '../services/paymentService.js';

export const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json({ message : "payment created successfully.",success: true, data: payment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllPayments = async (req, res) => {
    try {
        const payment = await paymentService.getAllPayment();
        res.status(200).json({ success: true, count: payment.length, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) return res.status(404).json({ message: " paymenet not found" });
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePaymentDetails = async (req, res) => {
    try {
        const payment = await paymentService.updatePayment(req.params.id, req.body);
        if (!payment) return res.status(404).json({ message: "payment not found" });
        res.status(200).json({ message :"payment updated successfully",success: true, data: payment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const payment = await paymentService.deletePayment(req.params.id);
        if (!payment) return res.status(404).json({ message: "payment not found" });
        res.status(200).json({ success: true, message: "payment record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};