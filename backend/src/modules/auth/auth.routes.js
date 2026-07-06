import express from 'express';
import { forgotPasswordController, getCurrentUserController, loginController, logOutController, refreshController, registerUserController, resetPasswordController, sendVerificationOtpController, verifyEmailController, verifyResetPasswordOtpController } from './auth.controller.js';
import { validate, validateOTP, validateToken } from '../../middlewares/validate.middleware.js';
import {forgotPasswordValidation, loginUserValidation, otpValidation, registerUserValidation, resetPasswordValidation, tokenValidation, verifyResetPasswordOtpValidation} from './auth.validation.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { googleLoginValidation } from './googleLoginValidation.js';
import { googleLoginController } from './googleLoginController.js';


const router = express.Router();

router.post('/register', validate(registerUserValidation) ,registerUserController);


router.post('/login',validate(loginUserValidation), loginController);

router.get('/refresh', validateToken(tokenValidation), refreshController );

router.post('/logout', validateToken(tokenValidation), logOutController);

router.get('/me', authenticate, getCurrentUserController);


router.get('/send-verification-otp', authenticate, sendVerificationOtpController);

router.post('/verify-email', authenticate, validateOTP(otpValidation), verifyEmailController);

router.post('/forgot-password',validate(forgotPasswordValidation) ,forgotPasswordController);

router.post('/verify-reset-password-otp',validate(verifyResetPasswordOtpValidation) ,verifyResetPasswordOtpController);

router.post('/reset-password',validate(resetPasswordValidation) ,resetPasswordController);

router.post('/google', validate(googleLoginValidation), googleLoginController);

export default router;