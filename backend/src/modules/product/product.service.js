import Product from "./product.model.js";
import Vendor from "../vendor/vendor.model.js";
import Store from "../store/store.model.js";
import Category from "../category/category.model.js";
import { uploadImage } from "../media/services/upload.service.js";
import { deleteImage } from "../media/services/delete.service.js";


export const createProductService = async (userId, productData, files=[]) => {
  const vendor = await Vendor.findOne({ userId });
  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }

  const category = await Category.findById(productData.categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const slug = productData.name.toLowerCase().replace(/\s+/g, "-");
  const existingProduct = await Product.findOne({ storeId: store._id, slug });
  if (existingProduct) {
    throw new Error("Product with this name already exists");
  }

  const uploadImages = await uploadMultipleImages({
    files,
    folder: "vendora/products"
});
  const images = uploadedImages.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }))

  const product = new Product({
    storeId: store._id,
    categoryId: productData.categoryId,
    name: productData.name,
    slug: slug,
    description: productData.description,
    price: productData.price,
    compareAtPrice: productData.compareAtPrice,
    stock: productData.stock,
    images
  });

  await product.save();
  return product;
};

export const getMyProductsService = async (userId) => {
  const vendor = await Vendor.findOne({ userId });
  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }

  const products = await Product.find({
    storeId: store._id,
    status: { $ne: "deleted" },
  })
    .sort({ createdAt: -1 })
    .populate("categoryId", "name");
  return products;
};

export const getProductByIdService = async (productId) => {
  const product = await Product.findOne({
    _id: productId,
    status: "active",
  })
    .populate("categoryId", "name")
    .populate("storeId", "name slug");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProductService = async (
  userId,
  productId,
  updateData,
  files = []
) => {
  // Find Vendor
  const vendor = await Vendor.findOne({ userId });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  // Find Store
  const store = await Store.findOne({
    vendorId: vendor._id,
    status: { $ne: "deleted" },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // Find Product
  const product = await Product.findOne({
    _id: productId,
    status: { $ne: "deleted" },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Ownership Check
  if (product.storeId.toString() !== store._id.toString()) {
    throw new Error("Unauthorized to update this product");
  }

  // Update Slug only if Name changes
  if (updateData.name && product.name !== updateData.name) {
    const slug = updateData.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const existingProduct = await Product.findOne({
      storeId: store._id,
      slug,
      _id: { $ne: productId },
      status: { $ne: "deleted" },
    });

    if (existingProduct) {
      throw new Error("Product with this name already exists");
    }

    updateData.slug = slug;
  }

  // Replace Images (if new images uploaded)
  if (files.length > 0) {
    // Upload new images first
    const uploadedImages = await uploadMultipleImages({
    files,
    folder: "vendora/products"
});

    // Delete old images only after successful upload
    await deleteMultipleImages(
    product.images.map(image => image.publicId)
);

    // Save new image metadata
    updateData.images = uploadedImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    }));
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedProduct;
};

export const deleteProductService = async (userId, productId) => {
  const vendor = await Vendor.findOne({ userId });
  if (!vendor) {
    throw new Error("Vendor not found");
  }
  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }
  const product = await Product.findOne({
    _id: productId,
    status: { $ne: "deleted" },
  });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.storeId.toString() !== store._id.toString()) {
    throw new Error("Unauthorized to delete this product");
  }

  product.status = "archived";
  await product.save();
  return product;
};

export const getProductsService = async (
  page,
  limit,
  search,
  category,
  minPrice,
  maxPrice,
  sort,
) => {
  const query = { status: "active" };
  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    query.categoryId = category;
  }

  if (minPrice) {
    query.price = {
      ...query.price,
      $gte: Number(minPrice),
    };
  }

  if (maxPrice) {
    query.price = {
      ...query.price,
      $lte: Number(maxPrice),
    };
  }

  let sortOption = {};

  switch (sort) {
    case "priceAsc":
      sortOption = { price: 1 };
      break;

    case "priceDesc":
      sortOption = { price: -1 };
      break;

    case "rating":
      sortOption = { averageRating: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .populate("categoryId", "name")
    .populate("storeId", "name slug")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(query);

  const totalPages = Math.ceil(totalProducts / limit);

  return { products, totalProducts, totalPages };
};

export const publishProductService = async (productId, userId) => {
  const vendor = await Vendor.findOne({ userId });
  if (!vendor) {
    throw new Error("Vendor not found");
  }
  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }
  const product = await Product.findOne({
    _id: productId,
    storeId: store._id,
    status: "draft",
  });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.status === "active") {
    throw new Error("Product is already published");
  }

  if (
    !product.description ||
    !product.price ||
    !product.stock ||
    !product.categoryId ||
    !product.images
  ) {
    throw new Error("Cannot publish incomplete product");
  }

  product.status = "active";

  const updatedProduct = await product.save();

  return updateProductService;
};
