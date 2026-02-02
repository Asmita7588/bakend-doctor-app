import express from "express";
import * as paymentController from "../controller/paymentController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const paymentRouter = express.Router();

paymentRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), paymentController.createPayment);
paymentRouter.get("/", paymentController.fetchAllPayments);
paymentRouter.get("/:id", paymentController.fetchPaymentById);
paymentRouter.patch("/:id", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), paymentController.updatePaymentDetails);
paymentRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), paymentController.deletePayment);

export default paymentRouter;