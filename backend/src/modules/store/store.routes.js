import express from 'express';
import { authenticate, authorize, requireVerifiedEmail } from '../../middlewares/auth.middleware.js'
import {validate} from '../../middlewares/validate.middleware.js';
import { createStoreValidation, updateStoreValidation } from './store.validation.js';
import { createStoreController, getStoreBySlugController, getStoreByVendorIdController, getStoreProductsController, getStoresController, updateStoreController } from './store.controller.js';
import upload from '../media/middleware/upload.js';

const router = express.Router();


router.post('/', authenticate, requireVerifiedEmail, authorize(['vendor']),
upload.fields([
        {
            name:"logo",
            maxCount:1
        },
        {
            name:"banner",
            maxCount:1
        }
    ]),
validate(createStoreValidation), createStoreController)

router.get('/', getStoresController);

router.get('/:vendorId', authenticate, requireVerifiedEmail, authorize(['vendor']), getStoreByVendorIdController)

router.patch('/:vendorId', authenticate, requireVerifiedEmail, authorize(['vendor']), validate(updateStoreValidation), updateStoreController)
router.get('/:slug', getStoreBySlugController);
router.get('/:slug/products', getStoreProductsController);


export default router;