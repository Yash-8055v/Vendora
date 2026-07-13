import express from 'express';
import { activateProductController, activeVendorController, approveVendorApplicationController, archiveProductController, cancelOrderByAdminController, deleteProductController, getAdminOrderByIdController, getAdminOrdersController, getAdminProductByIdController, getAdminProductsController, getDashboardController, getUsersController, getVendorApplicationsController, getVendorsController, refundOrderController, rejectVendorApplicationController, suspendVendorController } from './admin.controller.js';

import { authenticate, authorize, requireVerifiedEmail } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { rejectionReasonValidation } from './admin.validation.js';
const router = express.Router();

router.get('/vendor-applications',authenticate,requireVerifiedEmail, authorize(['admin']), getVendorApplicationsController);

router.patch('/vendor-applications/:id/approve', authenticate, requireVerifiedEmail, authorize(['admin']), approveVendorApplicationController);

router.patch('/vendor-applications/:id/reject', authenticate, requireVerifiedEmail, authorize(['admin']),validate(rejectionReasonValidation), rejectVendorApplicationController);

router.get('/dashboard', authenticate, requireVerifiedEmail, authorize(['admin']), getDashboardController)

router.get('/users', authenticate, requireVerifiedEmail, authorize(['admin']), getUsersController)

router.get('/vendors', authenticate, requireVerifiedEmail, authorize(['admin']), getVendorsController)

router.patch('/vendors/:id/suspend', authenticate, requireVerifiedEmail, authorize(['admin']), suspendVendorController)

router.patch('/vendors/:id/active', authenticate, requireVerifiedEmail, authorize(['admin']), activeVendorController)


router.get('/products', authenticate, requireVerifiedEmail, authorize(['admin']), getAdminProductsController);


router.get('/products/:id', authenticate, requireVerifiedEmail, authorize(['admin']), getAdminProductByIdController);

router.patch('/products/:id/archive', authenticate, requireVerifiedEmail, authorize(['admin']), archiveProductController);

router.patch('/products/:id/activate', authenticate, requireVerifiedEmail, authorize(['admin']), activateProductController);

router.delete('/products/:id', authenticate, requireVerifiedEmail, authorize(['admin']), deleteProductController);


router.get('/orders', authenticate, requireVerifiedEmail, authorize(['admin']),getAdminOrdersController)

router.get('/orders/:id', authenticate, requireVerifiedEmail, authorize(['admin']),getAdminOrderByIdController)

router.patch('/orders/:id/cancel', authenticate, requireVerifiedEmail, authorize(['admin']),cancelOrderByAdminController)

router.patch('/orders/:id/refund', authenticate, requireVerifiedEmail, authorize(['admin']),refundOrderController)

export default router;

