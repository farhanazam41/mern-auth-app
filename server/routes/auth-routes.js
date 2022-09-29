import express from 'express';  
import { signUp } from '../controllers/auth-controller.js';
import { userSignupValidator } from '../validators/auth-validator.js';
import runValidation from '../validators/index.js';

const router = express.Router();

router.post("/signup",userSignupValidator,runValidation, signUp);

export default router;