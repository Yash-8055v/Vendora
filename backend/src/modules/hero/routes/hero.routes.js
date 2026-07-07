import express from "express";
import {
  authenticate,
  authorize,
  requireVerifiedEmail,
} from "../../../middlewares/auth.middleware.js";
import { validate } from "../../../middlewares/validate.middleware.js";

import upload from "../../media/middleware/upload.js";
import { createHeroValidation, updateHeroValidation } from "../validations/hero.validation.js";
import {
  createHeroController,
  deleteHeroController,
  getAdminHeroSlidesController,
  getHeroByIdController,
  getHeroSlidesController,
  toggleHeroStatusController,
  updateHeroController,
} from "../controllers/hero.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  upload.single("image"),
  validate(createHeroValidation),
  createHeroController,
);

router.get("/", getHeroSlidesController);


router.get(
  "/admin",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  getAdminHeroSlidesController
);

router.get(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  getHeroByIdController
);


router.patch(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  upload.single("image"),
  validate(updateHeroValidation),
  updateHeroController
);

router.patch(
  "/:id/toggle",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  toggleHeroStatusController
);

router.delete(
  "/:id",
  authenticate,
  requireVerifiedEmail,
  authorize(["admin"]),
  deleteHeroController
);

export default router;