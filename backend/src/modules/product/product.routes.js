import express from "express";
import {
  createProductController,
  deleteProductController,
  getMyProductsController,
  getProductByIdController,
  getProductsController,
  publishProductController,
  updateProductController,
} from "./product.controller.js";
import {
  authenticate,
  requireVerifiedEmail,
  authorize
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  requireVerifiedEmail,
  authorize(["vendor"]),
  createProductController,
);

router.get(
  "/my-products",
  authenticate,
  requireVerifiedEmail,
  authorize(["vendor"]),
  getMyProductsController,
);

router.get("/", getProductsController);

router.get("/:id", getProductByIdController);

router.patch(
  "/:id/publish",
  authenticate,
  requireVerifiedEmail,
  authorize(["vendor"]),
  publishProductController,
);

router.patch(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["vendor"]),
  updateProductController,
);

router.delete(
  "/:id/archive",
  authenticate,
  requireVerifiedEmail,
  authorize(["vendor"]),
  deleteProductController,
);

export default router;
