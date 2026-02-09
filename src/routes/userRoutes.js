import express from "express";
const router = express.Router();
import * as userController from "../controller/userController.js";
import { validateUser } from "../validations/user.validations.js";
import * as  authMiddleware from "../middleware/authMiddleware.js"


router.post("/",validateUser,authMiddleware.auth, authMiddleware.authorizeRole("ADMIN"), validateUser, userController.register);
router.get("/", userController.fetchAllUsers);
router.get("/:email", userController.fetchUserByEmail);
// router.get("/:id", userController.fetchUserByID);
router.patch("/:id", validateUser,authMiddleware.auth, authMiddleware.authorizeRole("ADMIN"), userController.updateUserDetails);
router.delete("/:id", authMiddleware.auth,authMiddleware.authorizeRole("ADMIN"), userController.deleteUser);

// router.post("/create", userController.create);
// router.get("/fetch", userController.getAll);

export default router;
