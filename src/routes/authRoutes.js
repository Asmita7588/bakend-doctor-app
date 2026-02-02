import express from "express";
const authRouter = express.Router();
import * as authController from "../controller/authController.js";

authRouter.post('/login', authController.login);

export default authRouter;