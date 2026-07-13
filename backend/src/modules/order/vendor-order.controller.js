import { getVendorOrdersService ,confirmOrderService, shipOrderService, outForDeliveryService, deliverOrderService } from './vendor-order.service.js';


export const getVendorOrdersController = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await getVendorOrdersService(userId);

    return res.status(200).json({
      status: true,
      message: "All orders fetched successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

export const confirmOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    const updatedOrder = await confirmOrderService(userId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};


export const shipOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    const updatedOrder = await shipOrderService(userId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order Shipped successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};

export const outForDeliveryController = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    const updatedOrder = await outForDeliveryService(userId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order is out for delivery",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};

export const deliverOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    const updatedOrder = await deliverOrderService(userId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order delivered successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};