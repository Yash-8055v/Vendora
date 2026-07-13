import {
  activateProductService,
  activeVendorService,
  archiveProductService,
  cancelOrderByAdminService,
  deleteProductService,
  getAdminOrderByIdService,
  getAdminOrdersService,
  getAdminProductsService,
  getDashboardService,
  getUsersService,
  getVendorApplications,
  getVendorsService,
  refundOrderService,
  suspendVendorService,
} from "./admin.service.js";

export const getVendorApplicationsController = async (req, res) => {
  try {
    const applications = await getVendorApplications();
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveVendorApplicationController = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const application = await approveVendorApplication(id, adminId);
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    if (error.message === "Vendor application not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === "Vendor application has already been reviewed") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectVendorApplicationController = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;
  const { rejectionReason } = req.body;

  try {
    const application = await rejectVendorApplication(
      id,
      adminId,
      rejectionReason,
    );
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    if (error.message === "Vendor application not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === "Vendor application has already been reviewed") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardController = async (req, res) => {
  try {
    const dashboard = await getDashboardService();
    return res.status(200).json({
      success: true,
      dashboard: dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService();
    return res.status(200).json({
      success: true,
      dashboard: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getVendorsController = async (req, res) => {
  try {
    const vendors = await getVendorsService();
    return res.status(200).json({
      success: true,
      vendors: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const suspendVendorController = async (req, res) => {
  try {
    const vendorId = req.params.id;
    await suspendVendorService(vendorId);
    return res.status(200).json({
      success: true,
      message: "Vendor mark as suspended",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const activeVendorController = async (req, res) => {
  try {
    const vendorId = req.params.id;
    await activeVendorService(vendorId);
    return res.status(200).json({
      success: true,
      message: "Vendor mark as active",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminProductsController = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Math.max(1, Number(page) || 1);
    limit = Math.min(50, Math.max(1, Number(limit) || 10));

    const { products, totalProducts, totalPages } =
      await getAdminProductsService(page, limit);
    return res.status(200).json({
      success: true,
      message: "All Products",
      data: {
        products,
        page,
        limit,
        totalProducts,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await getAdminProductByIdService(productId);

    return res.status(200).json({
      success: true,
      message: "Product by id",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const archiveProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await archiveProductService(productId);

    return res.status(200).json({
      success: true,
      message: "Product is archived",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const activateProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await activateProductService(productId);

    return res.status(200).json({
      success: true,
      message: "Product is activate",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await deleteProductService(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminOrdersController = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Math.max(1, Number(page) || 1);
    limit = Math.min(50, Math.max(1, Number(limit) || 10));

    const {orders, totalOrders, totalPages} = await getAdminOrdersService(page, limit);

    return res.status(200).json({
      success: true,
      message: "orders",
      data: {
        orders,
        page,
        limit,
        totalOrders,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await getAdminOrderByIdService(orderId);

    return res.status(200).json({
      success: true,
      message: "order fetched successfully",
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const cancelOrderByAdminController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await cancelOrderByAdminService(orderId);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const refundOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await refundOrderService(orderId);

    return res.status(200).json({
      success: true,
      message: "Refund processed successfully",
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
