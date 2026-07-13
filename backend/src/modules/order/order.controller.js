import {
cancelOrderService,
createOrderService,
getOrderByIdService,
getOrdersService,
} from "./order.service.js";

// checkout
export const createOrderController = async (req, res) => {
try {
const { addressId, paymentMethod } = req.body;

const order = await createOrderService(
    req.user.id,
    addressId,
    paymentMethod,
);

res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
});
} catch (error) {
res.status(500).json({
    success: false,
    message: error.message,
});
}
};

export const getOrdersController = async (req, res) => {
try {
const orders = await getOrdersService(req.user.id);
res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
});
} catch (error) {
res.status(500).json({
    success: false,
    message: error.message,
});
}
};

export const getOrderByIdController = async (req, res) => {
try {
const order = await getOrderByIdService(req.user.id, req.params.id);
res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    order,
});
} catch (error) {
res.status(500).json({
    success: false,
    message: error.message,
});
}
};

export const cancelOrderController = async (req, res) => {
try {
const order = await cancelOrderService(req.user.id, req.params.id);
res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
});
} catch (error) {
res.status(500).json({
    success: false,
    message: error.message,
});
}
};
