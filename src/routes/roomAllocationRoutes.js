import express from "express";
import * as roomAllocationController from "../controller/roomAllocationController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const roomAllocationRouter = express.Router();

roomAllocationRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomAllocationController.allocateRoomForPatient);
roomAllocationRouter.get("/", roomAllocationController.fetchAllAllocatedRooms);
roomAllocationRouter.get("/:id", roomAllocationController.fetchAllocatedRoomById);
roomAllocationRouter.patch("/:id", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomAllocationController.updateAllocatedRoomDetails);
roomAllocationRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomAllocationController.deleteAllocatedRoom);

export default roomAllocationRouter;