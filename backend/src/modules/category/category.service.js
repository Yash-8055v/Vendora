import Category from "./category.model.js";
import {replaceImage} from "../media/services/replace.service.js";
import {uploadImage} from "../media/services/upload.service.js";

export const createCategoryService = async (categoryData, file) => {
  const existingCategory = await Category.findOne({
    name: categoryData.name,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const slug = categoryData.name.toLowerCase().trim().replace(/\s+/g, "-");

  let image = {
    url: "",
    publicId: "",
  };

  if (file) {
    image = await uploadImage({
      file,
      folder: "vendora/categories",
    });
  }

  const category = await Category.create({
    ...categoryData,
    slug,
    image,
  });

  return category;
};

export const getAllCategoriesService = async () => {
  return await Category.find({
    isActive: true,
  }).sort({ createdAt: -1 });
};

export const getCategoryByIdService = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const updateCategoryService = async (categoryId, updateData, file) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  if (updateData.name) {
    category.name = updateData.name;

    category.slug = updateData.name.toLowerCase().trim().replace(/\s+/g, "-");
  }

  if (updateData.description !== undefined) {
    category.description = updateData.description;
  }

  if (updateData.isActive !== undefined) {
    category.isActive = updateData.isActive;
  }

  if (file) {
    category.image = await replaceImage({
      oldPublicId: category.image?.publicId,
      file,
      folder: "vendora/categories",
    });
  }


  await category.save();

  return category;
};

export const deleteCategoryService = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  category.isActive = false;

  await category.save();

  return category;
};
