import { generateOrderNumber } from "../../utils/generateOrderNumber.js";
import Order from "./order.model.js";
import Cart from "../cart/cart.model.js";
import Address from "../address/address.model.js";
import Product from "../product/product.model.js";



export const createOrderService = async (userId, addressId, paymentMethod) => {
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const address = await Address.findOne({ userId, _id: addressId });
    if (!address) {
      throw new Error("Address not found");
    }

    

    let subtotal = 0;
    const orderItems = [];
    let shippingFee = 0;
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = item.productId;
      if (product) {
        if (product.status === "active") {
          if (product.stock < item.quantity) {
            throw new Error(`Product ${product.name} is out of stock`);
          } else {
            orderItems.push({
              storeId: product.storeId,
              productId: product._id,
              productName: product.name,
              productPrice: product.price,
              quantity: item.quantity,
            });

            subtotal += product.price * item.quantity;
            //update stock
            product.stock -= item.quantity;
            await product.save();
          }
        } else {
          throw new Error(
            `Product ${product.name} is not available to Purchase`,
          );
        }
      }
    }
    totalAmount = subtotal + shippingFee;


    const orderNumber = generateOrderNumber();

    const order = new Order({
      userId,
      addressId,
      orderItems,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
      orderNumber,
    });
    await order.save();
    //clear cart
    await Cart.deleteOne({ userId });
    return order;

  } catch (error) {
    throw new Error(error.message);
  }
};


export const getOrdersService = async (userId) => {
    try {
        const orders = await Order.find({ userId }).populate("addressId", "fullname city state").sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getOrderByIdService = async (userId, orderId) => {
    try {
        const order = await Order.findOne({ userId, _id: orderId }).populate("addressId");
        if (!order) {
            throw new Error("Order not found");
        }
        //order belongs to user?
        if (order.userId.toString() !== userId) {
            throw new Error("You are not authorized to view this order");
        }
        return order;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const cancelOrderService = async (userId, orderId) => {
    try {
        const order = await Order.findOne({ _id: orderId }).populate("addressId");
        if (!order) {
            throw new Error("Order not found");
        }

        if (order.userId.toString() !== userId) {
            throw new Error("You are not authorized to cancel this order");
        }
        
        if(order.status === "delivered" || order.status === "shipped" || order.status === "confirmed" || order.status === "cancelled" || order.status === "out_for_delivery"){
            throw new Error("Order cannot be cancelled");
        }

        //restore stock
        for(const item of order.items){
            const product = await Product.findById(item.productId);
            if(product){
                product.stock += item.quantity;
                await product.save();
            }
        } 

        order.status = "cancelled";

        await order.save();

        return order;
    } catch (error) {
        throw new Error(error.message);
    }
}
