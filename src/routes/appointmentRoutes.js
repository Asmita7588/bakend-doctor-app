import express from "express";
import * as appointmentController from "../controller/appointmentController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const appointmentRouter = express.Router();

appointmentRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), appointmentController.createAppointment);
appointmentRouter.get("/", appointmentController.fetchAllAppointment);
appointmentRouter.get("/:id", appointmentController.fetchAppointmentById);
appointmentRouter.patch("/:id", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), appointmentController.updateAppointmentDetails);
appointmentRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), appointmentController.deleteAppointment);

export default appointmentRouter;