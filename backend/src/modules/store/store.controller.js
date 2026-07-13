import { getStoreBySlugService, getStoreByVendorIdService, getStoreProductsService, getStoresService, updateStoreService } from "./store.service.js";




export const createStoreController = async (req, res) => {
  try {
    const userId = req.user._id; 
    const storeData = req.body;

    const newStore = await createStoreService(userId, storeData);

    res.status(201).json({success: true, message: "Store created successfully", data: newStore});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStoreByVendorIdController = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const store = await getStoreByVendorIdService(vendorId);

    res.status(200).json({ success: true, message: "Store retrieved successfully", data: store });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateStoreController = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const storeData = req.body; 

    const updatedStore = await updateStoreService(vendorId, storeData);

    res.status(200).json({ success: true, message: "Store updated successfully", data: updatedStore });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStoresController = async (req, res) => {
  try {
    const stores = await getStoresService();
    return res.status(200).json({
      success: true,
      messages: "All stores",
      stores: stores
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messages: error.message,
      
    });
  }
}

export const getStoreBySlugController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const store = await getStoreBySlugService(slug);
    return res.status(200).json({
      success: true,
      store: store
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messages: error.message,
      
    });
  }
}


export const getStoreProductsController = async (req, res) => {
  try {
    const slug = req.params.slug;
    let {page, limit} = req.query;
    page = Math.max(1, Number(page) || 1);
    limit = Math.min(50, Math.max(1, Number(limit) || 10));

    const {products, totalProducts, totalPages} = await getStoreProductsService(slug, page, limit);
    return res.status(200).json({
      success: true,
      messages: "All stores",
      data: {
        products, page, totalProducts, totalPages
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messages: error.message,
      
    });
  }
}



