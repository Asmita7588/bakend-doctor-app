import * as deptService from "../services/departmentService.js";

export const createDept = async (req, res) => {
    try {
        const dept = await deptService.createDepartment(req.body);
        res.status(201).json({ success: true, data: dept });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDepts = async (req, res) => {
    try {
        const depts = await deptService.getAllDepartments();
        res.status(200).json({ success: true, count: depts.length, data: depts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDept = async (req, res) => {
    try {
        const dept = await deptService.getDepartmentById(req.params.id);
        if (!dept) return res.status(404).json({ message: "Department not found" });
        res.status(200).json({ success: true, data: dept });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDept = async (req, res) => {
    try {
        const updated = await deptService.updateDepartment(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteDept = async (req, res) => {
    try {
        await deptService.deleteDepartment(req.params.id);
        res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};