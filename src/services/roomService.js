import Room from "../models/roomModel.js"


export const createRoom = async (roomData) => {
    return await Room.create(roomData);
};


export const getAllRooms = async () => {
    return await Room.find();
};


export const getRoomById = async (id) => {
    return await Room.findById(id);
};

export const updateRoom = async (id, updateData) => {
    return await Room.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteRoom = async (id) => {
    return await Room.findByIdAndDelete(id);
};