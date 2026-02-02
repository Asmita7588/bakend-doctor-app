import express from "express";
import * as patientController from "../controller/patientController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const patientRouter = express.Router();

patientRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), patientController.addPatient);
patientRouter.get("/", patientController.getPatients);
patientRouter.get("/:id", patientController.getPatient);
patientRouter.patch("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), patientController.patchPatient);
patientRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), patientController.removePatient);

export default patientRouter;