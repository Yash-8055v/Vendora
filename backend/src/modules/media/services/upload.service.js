import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = ({
  file,
  folder,
  transformations = [],
  publicId,
}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        transformation: transformations,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const uploadMultipleImages = async ({
  files,
  folder,
  transformations = [],
}) => {
  return Promise.all(
    files.map((file) =>
      uploadImage({
        file,
        folder,
        transformations,
      })
    )
  );
};