import * as roomAllocationService from '../services/roomAllocationService.js';

export const allocateRoomForPatient = async (req, res) => {
    try {
        const room = await roomAllocationService.allocateRoom(req.body);
        res.status(201).json({ message : "Room allocated successfully.",success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllAllocatedRooms = async (req, res) => {
    try {
        const room = await roomAllocationService.getAllAllocatedRooms();
        res.status(200).json({ success: true, count: room.length, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchAllocatedRoomById = async (req, res) => {
    try {
        const room = await roomAllocationService.getAllocatedRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: " Allocated Room not found" });
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAllocatedRoomDetails = async (req, res) => {
    try {
        const room = await roomAllocationService.updateAllocatedRoom(req.params.id, req.body);
        if (!room) return res.status(404).json({ message: "Allocated room not found" });
        res.status(200).json({ message :"Allocated room updated successfully",success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteAllocatedRoom = async (req, res) => {
    try {
        const room = await roomAllocationService.deleteAllocatedRoom(req.params.id);
        if (!room) return res.status(404).json({ message: "allocated room not found" });
        res.status(200).json({ success: true, message: " allocated room record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};