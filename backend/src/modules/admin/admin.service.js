import VendorApplication from "../vendor/vendorApplication.model.js";
import User from "../auth/auth.model.js";
import Vendor from "../vendor/vendor.model.js";
import Store from "../store/store.model.js";
import Category from "../category/category.model.js";
import Product from "../product/product.model.js";
import Order from "../order/order.model.js";

export const getVendorApplications = async () => {
  const applications = await VendorApplication.find()
    .sort({ createdAt: -1 })
    .populate("userId", "name email")
    .exec();
  return applications;
};

export const approveVendorApplication = async (applicationId, adminId) => {
  const application = await VendorApplication.findById(applicationId);
  if (!application) {
    throw new Error("Vendor application not found");
  }

  if (application.status !== "pending") {
    throw new Error("Vendor application has already been reviewed");
  }

  await Vendor.create({
    userId: application.userId,
    businessName: application.businessName,
    businessType: application.businessType,
    phone: application.phone,
    gstNumber: application.gstNumber,
    address: application.address,
  });

  await User.findByIdAndUpdate(application.userId, { role: "vendor" });

  application.status = "approved";
  application.reviewedBy = adminId;
  application.reviewedAt = new Date();
  await application.save();
  return application;
};

export const rejectVendorApplication = async (
  applicationId,
  adminId,
  rejectionReason,
) => {
  const application = await VendorApplication.findById(applicationId);
  if (!application) {
    throw new Error("Vendor application not found");
  }
  if (application.status !== "pending") {
    throw new Error("Vendor application has already been reviewed");
  }
  application.status = "rejected";
  application.reviewedBy = adminId;
  application.reviewedAt = new Date();
  application.rejectionReason = rejectionReason;
  await application.save();
  return application;
};

export const getDashboardService = async () => {
  const totalUsers = await User.countDocuments();
  const totalVendors = await Vendor.countDocuments();
  const pendingVendors = await Vendor.countDocuments({
    status: "pending",
  });
  const approvedVendors = await Vendor.countDocuments({
    status: "approved",
  });
  const rejectedVendors = await Vendor.countDocuments({
    status: "rejected",
  });

  const totalStores = await Store.countDocuments();

  const totalCategories = await Category.countDocuments();

  const totalProducts = await Product.countDocuments();

  const activeProducts = await Product.countDocuments({
    status: "active",
  });

  const archivedProducts = await Product.countDocuments({
    status: "archived",
  });

  const totalOrders = await Order.countDocuments();

  const pendingOrders = await Order.countDocuments({
    status: "pending",
  });

  const deliveredOrders = await Order.countDocuments({
    status: "delivered",
  });

  const cancelledOrders = await Order.countDocuments({
    status: "cancelled",
  });

  let totalRevenue = 0;
  for (order of deliveredOrders) {
    totalRevenue += order.totalAmount;
  }

  dashboard = {
    totalUsers,
    totalVendors,
    pendingVendors,
    approvedVendors,
    rejectedVendors,

    totalStores,

    totalCategories,

    totalProducts,
    activeProducts,
    archivedProducts,

    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,
  };

  return dashboard;
};

export const getUsersService = async () => {
  const users = await User.find({
    role: { $ne: "admin" },
  })
    .select(
      "-passwordHash -refreshTokenHashes -emailOtpHash -emailOtpExpiresAt",
    )
    .sort({ createdAt: -1 });

  return users;
};

export const getVendorsService = async () => {
  const vendors = await Vendor.find()
    .populate("userId", "name email status")
    .sort({ createdAt: -1 });

  return vendors;
};

export const suspendVendorService = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }
  if (vendor.status === "suspended") {
    throw new Error("Use is already suspended");
  }
  vendor.status = "suspended";

  const user = await User.findById(vendor.userId);

  user.status = "suspended";
  await vendor.save();
  await user.save();

  return;
};

export const activeVendorService = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }
  if (vendor.status === "active") {
    throw new Error("Use is already active");
  }
  vendor.status = "active";

  const user = await User.findById(vendor.userId);

  user.status = "active";
  await vendor.save();
  await user.save();

  return;
};

export const getAdminProductsService = async (page, limit) => {
  const skip = (page - 1) * limit;
  const products = await Product.find()
    .populate("categoryId", "name")
    .populate("storeId", "name slug")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
  return { products, totalProducts, totalPages };
};

export const getAdminProductByIdService = async (productId) => {
  const product = await Product.findById(productId)
    .populate("categoryId", "name slug")
    .populate("storeId", "name slug");

  if (!product) {
    throw new Error("product not found");
  }

  return product;
};

export const archiveProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("product not found");
  }

  if (product.status === "archived") {
    throw new Error("product already archived");
  }

  product.status === "archived";
  await product.save();

  return product;
};

export const activateProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("product not found");
  }

  if (product.status === "active") {
    throw new Error("product already active");
  }

  product.status === "active";
  await product.save();

  return product;
};

export const deleteProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("product not found");
  }

  if (product.status === "deleted") {
    throw new Error("product already deleted");
  }

  product.status === "deleted";
  await product.save();

  return product;
};

export const getAdminOrdersService = async (page, limit) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("addressId")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments();
  const totalPages = Math.ceil(totalOrders / limit);
  return {
    orders,
    totalOrders,
    totalPages,
  };
};

export const getAdminOrderByIdService = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("addressId")
    .populate("items.storeId", "name slug");

  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

export const cancelOrderByAdminService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === "cancelled") {
    throw new Error("Order already cancelled");
  }

  if (order.status === "delivered") {
    throw new Error("Delivered orders cannot be cancelled.Please use refund.");
  }

  for (const item of order.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.stock += item.quantity;

      await product.save();
    }
  }

  order.status = "cancelled";
  const updatedOrder = order.save();
  return updatedOrder;
};

export const refundOrderService = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus === "refunded") {
    throw new Error("Order already refunded");
  }

  if (order.paymentStatus !== "paid") {
    throw new Error("Only paid orders can be refunded");
  }

  if (order.status !== "cancelled" && !order.status !== "delivered") {
    throw new Error("Order cannot be refunded");
  }

  order.paymentStatus = "refunded";

  const updatedOrder = await order.save();

  return updatedOrder;
};
