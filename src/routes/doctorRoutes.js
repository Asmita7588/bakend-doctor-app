import express from "express";
import * as doctorController from "../controller/doctorController.js"
import * as authMiddleware from "../middleware/authMiddleware.js"
const doctorRouter = express.Router();

doctorRouter.post("/", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), doctorController.createDoctorAccount);

// doctorRouter.post("/" , doctorController.createDoctorAccount)
doctorRouter.get("/" ,doctorController.fetchAllDoctors)
doctorRouter.get('/:id', doctorController.fetchDoctorById);
doctorRouter.patch('/:id',authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), doctorController.updateDoctorDetails);
doctorRouter.delete('/:id',authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), doctorController.deleteDoctorAccount);

export default doctorRouter;


