import express from 'express';
import { confirmOrderController, deliverOrderController, getVendorOrdersController, outForDeliveryController, shipOrderController } from './vendor-order.controller.js';
import {authenticate, authorize, requireVerifiedEmail} from '../../middlewares/auth.middleware.js';



const router = express.Router();

router.get('/', authenticate, requireVerifiedEmail,authorize(["vendor"]), getVendorOrdersController)

router.patch('/:id/confirm', authenticate, requireVerifiedEmail,authorize(["vendor"]), confirmOrderController)

router.patch('/:id/ship', authenticate, requireVerifiedEmail,authorize(["vendor"]), shipOrderController)

router.patch('/:id/out-for-delivery', authenticate, requireVerifiedEmail,authorize(["vendor"]), outForDeliveryController)

router.patch('/:id/deliver', authenticate, requireVerifiedEmail,authorize(["vendor"]), deliverOrderController)

export default router;




