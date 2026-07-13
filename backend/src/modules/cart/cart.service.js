import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
import User from "../auth/auth.model.js";





export const addToCartService = async (userId, productId, quantity) => {
  
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const status = product.status;
  if (status !== "active") {
    throw new Error("Product is not available for purchase");
  } 


  const stock = product.stock;
  if (quantity > stock) {
    throw new Error("Insufficient stock available");
  }

  // Check if the cart exists for the user
  let cart = await Cart.findOne({ userId });  
  if (!cart) {
    // If the cart doesn't exist, create a new one
    cart = new Cart({ userId, items: [] });
  }

  // Check if the product is already in the cart
  const existingCartItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );  

  // If the product is already in the cart, update the quantity
  if (existingCartItemIndex !== -1) {
    const existingCartItem = cart.items[existingCartItemIndex];
    const newQuantity = existingCartItem.quantity + quantity;
    cart.items[existingCartItemIndex].quantity = newQuantity;
  } else {
    // If the product is not in the cart, add it
    cart.items.push({ productId, quantity, priceAtAddition: product.price });
  }

  // Save the updated cart
  await cart.save();
  return cart;
};

export const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId", "name price images stock status");
  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};

export const updateCartItemQuantityService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });  
  if (!cart) {
    throw new Error("Cart not found");
  }
  const existingCartItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );  
  if (existingCartItemIndex === -1) {
    throw new Error("Product not found in cart");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  const stock = product.stock;
  if (quantity > stock) {
    throw new Error("Insufficient stock available");
  } 
  
  cart.items[existingCartItemIndex].quantity = quantity;
  await cart.save();
  return cart;
};

export const removeCartItemService = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }
  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await cart.save();
  return cart;
};