import express from 'express';
import { getCurrentUserController, loginController, logOutController, refreshController, registerUserController } from './auth.controller.js';
import { validate, validateToken } from '../../middlewares/validate.middleware.js';
import {loginUserValidation, registerUserValidation, tokenValidation} from './auth.validation.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/register', validate(registerUserValidation) ,registerUserController);


router.post('/login',validate(loginUserValidation), loginController);

router.get('/refresh', validateToken(tokenValidation), refreshController );

router.post('/logout', validateToken(tokenValidation), logOutController);

router.get('/me', authenticate, getCurrentUserController);


router.get('/send-verification-otp', authenticate);


export default router;