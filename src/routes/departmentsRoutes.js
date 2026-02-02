import express from "express";
import * as departmentController from "../controller/departmentController.js"
import * as authMiddleware from "../middleware/authMiddleware.js"
const departmentRouter = express.Router();

departmentRouter.post("/", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), departmentController.createDept);

departmentRouter.get("/" ,departmentController.getDepts)
departmentRouter.get('/:id', departmentController.getDept);
departmentRouter.patch('/:id',authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), departmentController.updateDept);
departmentRouter.delete('/:id',authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), departmentController.deleteDept);

export default departmentRouter;


