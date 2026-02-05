import * as patientService from "../services/patientService.js";
import radis from "../config/radisClient.js";

export const addPatient = async (req, res) => {
    try {
        const patient = await patientService.createPatient(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getPatients = async (req, res) => {
       const cacheKey = "patients_data";
    try {
        const cachedData = await radis.get(cacheKey);
        if (cachedData) {
            console.log("Getting data from Redis cache");
            return res.json({
                success: true,
                message: "fetched from cache",
                data: JSON.parse(cachedData)
            });
        }

        const patients = await patientService.getAllPatients();

        //store in redis for 10 min
        await radis.setEx(cacheKey, 600, JSON.stringify(patients));
        res.status(200).json({message:"fetching data from db", count: patients.length, success: true, data: patients });
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