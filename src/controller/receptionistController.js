import * as recepService from "../services/receptionistService.js";

export const addReceptionist = async (req, res) => {
    try {
        const receptionist = await recepService.createReceptionist(req.body);
        res.status(201).json({ success: true, data: receptionist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllReceptionists = async (req, res) => {
    try {
        const data = await recepService.getAllReceptionists();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, couunt : data.length });
    }
};

export const getReceptionist = async (req, res) => {
    try {
        const data = await recepService.getReceptionistById(req.params.id);
        if (!data) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateRecep = async (req, res) => {
    try {
        const updated = await recepService.updateReceptionist(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const removeRecep = async (req, res) => {
    try {
        await recepService.deleteReceptionist(req.params.id);
        res.status(200).json({ success: true, message: "Receptionist Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};