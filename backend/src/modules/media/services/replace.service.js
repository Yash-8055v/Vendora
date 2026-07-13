import { uploadImage } from "./upload.service.js";
import { deleteImage } from "./delete.service.js";

export const replaceImage = async ({
  oldPublicId,
  file,
  folder,
  transformations = [],
}) => {
  const uploadedImage = await uploadImage({
    file,
    folder,
    transformations,
  });

  if (oldPublicId) {
    await deleteImage(oldPublicId);
  }

  return uploadedImage;
};