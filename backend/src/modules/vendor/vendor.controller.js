import { applyVendorService, getVendorProfileService } from "./vendor.service.js";



export const applyVendorController = async (req, res) => {
  try {
    const userId = req.user._id; 
    const vendorData = req.body;

    const newVendorApplication = await applyVendorService(vendorData, userId);  

    res.status(201).json({
      success: true,
      data: newVendorApplication
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};  

export const getVendorApplicationStatusController = async (req, res) => {
  try {
    const userId = req.user._id;  
    const application = await getVendorApplicationStatusService(userId);

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const getVendorProfileController = async (req, res) => {
  try {
    const userId = req.user._id;  
    const vendor = await getVendorProfileService(userId);
    
    res.status(200).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};