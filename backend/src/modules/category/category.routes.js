import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller.js";

import { authenticate, authorize, requireVerifiedEmail } from "../../middlewares/auth.middleware.js";
import {validate} from '../../middlewares/validate.middleware.js';
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";

import upload from "../media/middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  upload.single("image"),
  validate(createCategoryValidation),
  createCategoryController,
);

router.get("/", getAllCategoriesController);

router.get("/:id", getCategoryByIdController);

router.patch(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  upload.single("image"),
  validate(updateCategoryValidation),
  updateCategoryController,
);  

router.delete(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  deleteCategoryController,
);

export default router;
