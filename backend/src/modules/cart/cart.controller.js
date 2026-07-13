import { addToCartService, getCartService, removeCartItemService, updateCartItemQuantityService } from "./cart.service.js";



export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const cart = await addToCartService(userId, productId, quantity);
    res
      .status(200)
      .json({
        success: true,
        message: "Product added to cart successfully",
        cart,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await getCartService(userId);
    res
      .status(200) 
      .json({
        success: true,
        message: "Cart retrieved successfully",
        cart,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }   
};

export const updateCartItemQuantityController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const cart = await updateCartItemQuantityService(userId, productId, quantity);
    res
      .status(200)
      .json({
        success: true,
        message: "Cart item quantity updated successfully",
        cart,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const removeCartItemController = async (req, res) => {
  try {
    const { productId } = req.params; 
    const userId = req.user._id;
    const cart = await removeCartItemService(userId, productId);
    res
      .status(200)
      .json({
        success: true,
        message: "Cart item removed successfully",
        cart,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
