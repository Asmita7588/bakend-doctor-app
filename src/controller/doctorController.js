import * as doctorService from '../services/doctorService.js';

export const createDoctorAccount = async (req, res) => {
    try {
        //#swagger.security = [{"bearerAuth": []}]
        const doctor = await doctorService.createDoctor(req.body);
        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json({ success: true, count: doctors.length, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorById(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDoctorDetails = async (req, res) => {
    try {
        const doctor = await doctorService.updateDoctor(req.params.id, req.body);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteDoctorAccount = async (req, res) => {
    try {
        const doctor = await doctorService.deleteDoctor(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ success: true, message: "Doctor record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};