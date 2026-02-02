import roomAllocation from "../models/roomAllocationModel.js"


export const allocateRoom = async (roomData) => {
    return await roomAllocation.create(roomData);
};


export const getAllAllocatedRooms = async () => {
    return await roomAllocation.find();
};


export const getAllocatedRoomById = async (id) => {
    return await roomAllocation.findById(id);
};

export const updateAllocatedRoom = async (id, updateData) => {
    return await roomAllocation.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteAllocatedRoom = async (id) => {
    return await roomAllocation.findByIdAndDelete(id);
};