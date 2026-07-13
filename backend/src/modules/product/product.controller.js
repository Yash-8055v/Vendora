import {
  createProductService,
  deleteProductService,
  getMyProductsService,
  getProductByIdService,
  getProductsService,
  publishProductService,
  updateProductService,
} from "./product.service.js";

export const createProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const productData = req.body;
    const files = req.files;

    const product = await createProductService(userId, productData, files);
    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const publishProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.user.productId;

    const product = await publishProductService(productId, userId);
    res
      .status(200)
      .json({
        success: true,
        message: "product status updated to active",
        data: product,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyProductsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await getMyProductsService(userId);
    res
      .status(200)
      .json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await getProductByIdService(productId);

    res
      .status(200)
      .json({
        success: true,
        message: "Product retrieved successfully",
        data: product,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const updateData = req.body;
    const files = req.files;
    const updatedProduct = await updateProductService(
      userId,
      productId,
      updateData,
      files
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const deletedProduct = await deleteProductService(userId, productId);
    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    let { page, limit, search, category, minPrice, maxPrice, sort } = req.query;

    page = Math.max(1, Number(page) || 1);
    limit = Math.min(50, Math.max(1, Number(limit) || 10));

    const { products, totalProducts, totalPages } = await getProductsService(
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    );

    return res.status(200).json({
      success: true,
      products: products,
      page: page,
      limit: limit,
      totalProducts: totalProducts,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
