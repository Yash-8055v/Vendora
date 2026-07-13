import cloudinary from "../config/cloudinary.js";

export const deleteImage = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};

export const deleteMultipleImages = async (publicIds) => {
  await Promise.all(
    publicIds.map((publicId) => deleteImage(publicId))
  );
};