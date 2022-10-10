import express from "express";
import { getUserById,updateUserById, adminMiddleware } from "../controllers/user-controller.js";
import  {requireSignin}  from "../validators/requestValidator.js";
import { verifyToken } from "../helpers.js"

const router = express.Router();

router.get("/getuser/:id",verifyToken, getUserById);
router.put("/updateuser/:id",verifyToken, updateUserById);

export default router;
