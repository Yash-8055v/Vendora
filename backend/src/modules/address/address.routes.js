import express from "express";
import {
  createAddressController,
  getAllAddressesController,
  updateAddressController,
  deleteAddressController,
  setDefaultAddressController,
} from "./address.controller.js";
import {
  authenticate,
  requireVerifiedEmail,
} from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createAddressValidation, updateAddressValidation } from "./address.validation.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  requireVerifiedEmail,
  validate(createAddressValidation),
  createAddressController,
);
router.get("/", authenticate, requireVerifiedEmail, getAllAddressesController);
router.patch(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  validate(updateAddressValidation),
  updateAddressController,
);
router.delete(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  deleteAddressController,
);
router.patch(
  "/:id/default",
  authenticate,
  requireVerifiedEmail,
  setDefaultAddressController,
);

export default router;
