import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from './modules/auth/auth.routes.js';
import vendorRouter from './modules/vendor/vendor.routes.js';
import adminRouter from './modules/admin/admin.routes.js';
import storeRouter from './modules/store/store.routes.js';
import categoryRouter from './modules/category/category.routes.js';
import productRouter from './modules/product/product.routes.js';
import cartRouter from './modules/cart/cart.routes.js';
import addressRouter from './modules/address/address.routes.js';
import orderRouter from './modules/order/order.routes.js';
import vendorOrderRouter from './modules/order/vendor-order.routes.js';
import upload from "./modules/media/middleware/upload.js";
import { uploadImage } from "./modules/media/services/upload.service.js";
import heroRouter from './modules/hero/routes/hero.routes.js';
import homeRouter from './modules/home/routes/home.routes.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.VITE_API_URL || "http://localhost:5173",
  credentials: true,
  
}));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/addresses', addressRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/vendor/orders', vendorOrderRouter);
app.use('/api/v1/hero-slides', heroRouter);
app.use('/api/v1/home', homeRouter);

app.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    const result = await uploadImage(req.file, "test");

    return res.json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  }
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

export default app;
