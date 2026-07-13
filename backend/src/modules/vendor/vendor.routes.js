import express from 'express';

import { authenticate, authorize, requireVerifiedEmail } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { applyVendorValidation } from './vendor.validation.js';
import { applyVendorController, getVendorApplicationStatusController, getVendorProfileController } from './vendor.controller.js';

const router = express.Router();

router.post('/post', authenticate, requireVerifiedEmail, validate(applyVendorValidation), applyVendorController);

router.get('/application-status', authenticate, requireVerifiedEmail, getVendorApplicationStatusController);

router.get('/me', authenticate, requireVerifiedEmail, authorize(["vendor"]),getVendorProfileController);

export default router;