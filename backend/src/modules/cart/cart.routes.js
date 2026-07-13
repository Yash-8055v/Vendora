import express from 'express';
import { authenticate,requireVerifiedEmail } from '../../middlewares/auth.middleware.js';
import {validate} from '../../middlewares/validate.middleware.js';
import { addToCartController, getCartController, removeCartItemController, updateCartItemQuantityController } from './cart.controller.js';
import { addToCartValidation, updateCartItemValidation } from './cart.validation.js';




const router = express.Router();



router.post('/items', authenticate, requireVerifiedEmail, validate(addToCartValidation), addToCartController);

router.get('/', authenticate, requireVerifiedEmail, getCartController);

router.patch('/items/:productId', authenticate, requireVerifiedEmail, validate(updateCartItemValidation), updateCartItemQuantityController);

router.delete('/items/:productId', authenticate, requireVerifiedEmail, removeCartItemController);

export default router;
