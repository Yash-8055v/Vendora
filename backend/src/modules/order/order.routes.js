import express from "express";
import {
  cancelOrderController,
  createOrderController,
  getOrderByIdController,
  getOrdersController,
} from "./order.controller.js";
import {
  authenticate,
  requireVerifiedEmail,
} from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createOrderValidation } from "./order.validation.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  requireVerifiedEmail,
  validate(createOrderValidation),
  createOrderController,
);

router.get("/", authenticate, requireVerifiedEmail, getOrdersController);

router.get("/:id", authenticate, requireVerifiedEmail, getOrderByIdController);

router.patch(
  "/:id/cancel",
  authenticate,
  requireVerifiedEmail,
  cancelOrderController,
);

export default router;
