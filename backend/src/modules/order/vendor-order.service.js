import Vendor from '../vendor/vendor.model.js';
import Store from '../store/store.model.js';
import Order from './order.model.js';

export const getVendorOrdersService = async (userId) => {
  const vendor = await Vendor.findOne({ userId });
  if(!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id});
  if(!store) {
    throw new Error("Store not found");
  
  }

  const orders = await Order.find({
    "items.storeId" : store._id
  }).sort({ createAt: -1}).populate(
    "userId", "name email"
  ).populate(
    "addressId"
  );

  if(orders.length === 0) {
    throw new Error("Orders not found")
  }

  return orders;

}


export const confirmOrderService = async (userId, orderId) => {
  const vendor = await Vendor.findOne({ userId });
  if(!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id});
  if(!store) {
    throw new Error("Store not found");
  
  }

  const order = await Order.findById(orderId);

  if(!order) {
    throw new Error("Orders not found")
  }

  const hasStoreItem = order.items.some(
    item => item.storeId.toString() === store._id.toString()
  );

  if(!hasStoreItem) {
    throw new Error("You cannot access this order");
  }

  if(order.status !== "pending") {
    throw new Error("Order cannot be confirmed")
  }

  order.status = "confirmed";

  const updatedOrder = await order.save();

  return updatedOrder;
}


export const shipOrderService = async (userId, orderId) => {
  const vendor = await Vendor.findOne({ userId });
  if(!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id});
  if(!store) {
    throw new Error("Store not found");
  
  }

  const order = await Order.findById(orderId);

  if(!order) {
    throw new Error("Orders not found")
  }

  const hasStoreItem = order.items.some(
    item => item.storeId.toString() === store._id.toString()
  );

  if(!hasStoreItem) {
    throw new Error("You cannot access this order");
  }

  if(order.status !== "confirmed") {
    throw new Error("Order cannot be shipped")
  }

  order.status = "shipped";

  const updatedOrder = await order.save();

  return updatedOrder;
}


export const outForDeliveryService = async (orderId, userId) => {
  const vendor = await Vendor.findOne({ userId });
  if(!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id});
  if(!store) {
    throw new Error("Store not found");
  
  }

  const order = await Order.findById(orderId);

  if(!order) {
    throw new Error("Orders not found")
  }

  const hasStoreItem = order.items.some(
    item => item.storeId.toString() === store._id.toString()
  );

  if(!hasStoreItem) {
    throw new Error("You cannot access this order");
  }

  if(order.status !== "shipped") {
    throw new Error("Order cannot be marked as out for delivery")
  }

  order.status = "out_for_delivery";

  const updatedOrder = await order.save();

  return updatedOrder;
}



export const deliverOrderService = async (orderId, userId) => {
  const vendor = await Vendor.findOne({ userId });
  if(!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id});
  if(!store) {
    throw new Error("Store not found");
  
  }

  const order = await Order.findById(orderId);

  if(!order) {
    throw new Error("Orders not found")
  }

  const hasStoreItem = order.items.some(
    item => item.storeId.toString() === store._id.toString()
  );

  if(!hasStoreItem) {
    throw new Error("You cannot access this order");
  }

  if(order.status !== "out_for_delivery") {
    throw new Error("Order cannot be marked as deliver")
  }

  order.status = "delivered";

  if (order.paymentMethod === "cod") {
    order.paymentStatus = "paid";
  }

  const updatedOrder = await order.save();

  return updatedOrder;
}