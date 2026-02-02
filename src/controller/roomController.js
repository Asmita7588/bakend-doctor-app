import * as roomService from '../services/roomService.js';

export const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllRooms = async (req, res) => {
    try {
        const room = await roomService.getAllRooms();
        res.status(200).json({ success: true, count: room.length, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateRoomDetails = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const room = await roomService.deleteRoom(req.params.id);
        if (!room) return res.status(404).json({ message: "room not found" });
        res.status(200).json({ success: true, message: "room record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};