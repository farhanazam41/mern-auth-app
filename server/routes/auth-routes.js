import express from 'express';  
import { signUp,accountActivation, signIn } from '../controllers/auth-controller.js';
import { userSignupValidator,userSigninValidator } from '../validators/auth-validator.js';
import runValidation from '../validators/index.js';

const router = express.Router();

router.post("/signup",userSignupValidator,runValidation, signUp);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signIn);

export default router;