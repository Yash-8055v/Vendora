import VendorApplication from "./vendorApplication.model.js";



export const applyVendorService = async (vendorData, userId) => {
  const { businessName, businessType, phone, gstNumber, address, reasonForSelling } = vendorData; 

  const isExistingApplication = await VendorApplication.findOne({ userId });

  if (isExistingApplication) {
    throw new Error("You have already applied to become a vendor.");
  }

  const newVendorApplication = new VendorApplication({
    userId,
    businessName,
    businessType,
    phone,
    gstNumber,
    address,
    reasonForSelling
  });

  return await newVendorApplication.save();
};

export const getVendorApplicationStatusService = async (userId) => {
  const application = await VendorApplication.findOne({ userId });

  if (!application) {
    throw new Error("No vendor application found for this user.");
  }

  return application;
};

export const getVendorProfileService = async (userId) => {
  const vendor = await Vendor.findOne({ userId }).populate("userId", "name email").exec();
  if (!vendor) {
    throw new Error("No vendor found for this user.");
  }
  return vendor;
};