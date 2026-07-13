import Store from "./store.model.js";
import Vendor from "../vendor/vendor.model.js";
import {replaceImage} from "../media/services/replace.service.js";
import {uploadImage} from "../media/services/upload.service.js";



export const createStoreService = async (userId, storeData, files ) => {


  const { name, description} = storeData;
  const vendor = await Vendor.findOne({ userId });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const existingStore = await Store.findOne({ vendorId: vendor._id });

  if (existingStore) {
    throw new Error("Store already exists for this vendor");
  } 
  const slug = name.toLowerCase().replace(/\s+/g, "-"); 

  let logo = {
    url: "",
    publicId: "",
  };

  let banner = {
    url: "",
    publicId: "",
  };

  if(files && files.logo) {
    logo = await uploadImage({
      file: files.logo[0],
      folder: "vendora/stores/logos",
    });
  }

  if(files && files.banner) {
    banner = await uploadImage({
      file: files.banner[0],
      folder: "vendora/stores/banners",
    });
  }

  const newStore = new Store({
    vendorId: vendor._id,
    name,
    slug,
    description,
    logo,
    banner,
  });

  await newStore.save();

  return newStore;

}


export const getStoreByVendorIdService = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }

  return store;
}

export const updateStoreService = async (vendorId, storeData, files) => {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    throw new Error("Vendor not found");
  } 

  const store = await Store.findOne({ vendorId: vendor._id });
  if (!store) {
    throw new Error("Store not found");
  }

  const { name, description, logo, banner } = storeData;
  if (name) {
    store.name = name;
    store.slug = name.toLowerCase().replace(/\s+/g, "-");
  }
  if (description) {
    store.description = description;
  }
  if (files?.logo?.length) {
    store.logo = await replaceImage({
      oldPublicId: store.logo?.publicId,
      file: files.logo[0],
      folder: "vendora/stores/logos",
    });
  }

  if (files?.banner?.length) {
    store.banner = await replaceImage({
      oldPublicId: store.banner?.publicId,
      file: files.banner[0],
      folder: "vendora/stores/banners",
    });
  }

  await store.save();
  return store
}

export const getStoresService = async () => {
  const stores  = Store.find({
    status: "active"
  }).sort({
    createdAt: -1
  });

  return stores;

}


export const getStoreBySlugService = async (slug) => {
  const store  = Store.find({
    slug,
    status: "active",
  }).populate("vendorId", "businessName address rating");

  if(!store) {
    throw new Error("Store not found");
  }

  return store;

}

export const getStoreProductsService = async (slug, page, limit) => {
  const store  = Store.find({
    slug,
    status: "active",
  }).populate("vendorId", "businessName address rating");

  if(!store) {
    throw new Error("Store not found");
  }

  const skip = (page - 1) * limit;

  const products = await Product.find({
    storeId: store._id,
    status: "active"
  }).sort({
    createdAt: -1
  }).skip(skip).limit(limit).populate("categoryId");

  const totalProducts = await Product.countDocuments({
    storeId: store._id,
    status: "active"
  })

    const totalPages = Math.ceil(totalProducts/limit);

  return {
    products,
    totalProducts,
    totalPages
    
  };

}