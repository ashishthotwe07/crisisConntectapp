import express from "express";
import AuthController from "../controllers/auth.controller.js";
import verifyToken from "../middleware/Auth.js";

const router = express.Router();

const authController = new AuthController();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/sign-out",verifyToken, authController.signOut);
router.put("/update-user/:userId",verifyToken, authController.updateUser);
router.delete("/delete-user/:userId", authController.deleteUser);


export default router;
