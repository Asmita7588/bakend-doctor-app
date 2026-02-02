import * as patientService from "../services/patientService.js";

export const addPatient = async (req, res) => {
    try {
        const patient = await patientService.createPatient(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPatient = async (req, res) => {
    try {
        // console.log(req.params.id)
        const patient = await patientService.getPatientById(req.params.id);
            //    console.log(patient)
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const patchPatient = async (req, res) => {
    try {
        const updated = await patientService.updatePatient(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const removePatient = async (req, res) => {
    try {
        await patientService.deletePatient(req.params.id);
        res.status(200).json({ success: true, message: "Patient record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};