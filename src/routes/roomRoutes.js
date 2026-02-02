import express from "express";
import * as roomController from "../controller/roomController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const roomRouter = express.Router();

roomRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomController.createRoom);
roomRouter.get("/", roomController.fetchAllRooms);
roomRouter.get("/:id", roomController.fetchRoomById);
roomRouter.patch("/:id", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomController.updateRoomDetails);
roomRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), roomController.deleteRoom);

export default roomRouter;