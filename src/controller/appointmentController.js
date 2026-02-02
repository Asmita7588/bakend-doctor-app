import * as appointmentService from '../services/appointmentService.js';

export const createAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.getAllAppointments();
        res.status(200).json({ success: true, count: appointment.length, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentService.getAppointmentById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAppointmentDetails = async (req, res) => {
    try {
        const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.deleteAppointment(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json({ success: true, message: "Appointment record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};