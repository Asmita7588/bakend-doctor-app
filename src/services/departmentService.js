import Department from "../models/departmentModel.js";

export const createDepartment = async (data) => {
    const dept = await Department.create(data);
    return dept;
}

export const getAllDepartments = async () => {
   return await Department.find();
}

export const getDepartmentById = async (id) => {
    return await Department.findById(id);
}

export const updateDepartment = async (id, updateData) => {
    return await Department.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteDepartment = async (id) => await Department.findByIdAndDelete(id);