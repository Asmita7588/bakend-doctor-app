import express from "express";
import * as receptionistController from "../controller/receptionistController.js";
import * as authMiddleware from "../middleware/authMiddleware.js"
const receptionistRouter = express.Router();

receptionistRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN"), receptionistController.addReceptionist);
receptionistRouter.get("/", receptionistController.getAllReceptionists);
receptionistRouter.get("/:id", receptionistController.getReceptionist);
receptionistRouter.patch("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN"), receptionistController.updateRecep);
receptionistRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN"), receptionistController.removeRecep);

export default receptionistRouter;