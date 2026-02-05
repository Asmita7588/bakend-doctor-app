import express from "express";
import * as invoiceController from "../controller/InvoiceController.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"

const invoiceRouter = express.Router();

invoiceRouter.post("/",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), invoiceController.createInvoice);
invoiceRouter.get("/", invoiceController.fetchAllInvoices);
invoiceRouter.get("/:id", invoiceController.fetchInvoiceById);
invoiceRouter.patch("/:id", authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), invoiceController.updateInvoiceDetails);
invoiceRouter.delete("/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), invoiceController.deleteInvoice);
invoiceRouter.get("/pdf/:id",authMiddleware.auth, authMiddleware.authorizeRole("ADMIN", "RECEPTIONIST"), invoiceController.downloadInvoicePdf);



export default invoiceRouter;