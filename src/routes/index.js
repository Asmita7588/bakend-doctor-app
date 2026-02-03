import express from "express";
import userRoutes from "../routes/userRoutes.js"
import authRoutes from "../routes/authRoutes.js"
import doctorRoutes from "../routes/doctorRoutes.js"
import departmentRoutes from "../routes/departmentsRoutes.js"
import patientRoutes from "../routes/patientRoutes.js"
import receptionistRoutes from "../routes/receptionistRoutes.js"
import roomRoutes from "../routes/roomRoutes.js"
import roomAllocationRouter from "../routes/roomAllocationRoutes.js"
import paymentRouter from "../routes/paymentsRoutes.js"
import invoiceRouter from "../routes/inovoiceRoutes.js"
import appointmentRouter from "../routes/appointmentRoutes.js"

const router = express.Router();


router.use("/user", userRoutes)
router.use("/auth", authRoutes)
router.use("/doctor", doctorRoutes)
router.use("/department", departmentRoutes)
router.use("/patient", patientRoutes)
router.use("/receptionist",  receptionistRoutes)
router.use("/room", roomRoutes)
router.use("/roomAllocation", roomAllocationRouter)
router.use("/payment", paymentRouter)
router.use("/invoice", invoiceRouter)
router.use("/appointment", appointmentRouter)

export default router;