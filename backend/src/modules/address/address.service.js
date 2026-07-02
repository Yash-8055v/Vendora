import Address from "../address/address.model.js";


export const createAddressService = async (userId, addressData) => {
  const addressCount = await Address.countDocuments({
    userId,
  });

  if (addressCount === 0) {
    addressData.isDefault = true;
  } else if (addressData.isDefault === true) {
    await Address.updateMany({ userId }, { isDefault: false });
  }

  const address = await Address.create({ userId, ...addressData });
  return address;
};

export const getAllAddressesService = async (userId) => {
  const addresses = await Address.find({ userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
  return addresses;
};

export const updateAddressService = async (userId, addressId, addressData) => {
  //find the address by userId and addressId
  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) {
    throw new Error("Address not found");
  }

  if (addressData.isDefault === true) {
    await Address.updateMany({ userId }, { isDefault: false });
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    addressData,
    { new: true },
  );
  return updatedAddress;
};

export const deleteAddressService = async (userId, addressId) => {
  const address = await Address.findOne({ _id: addressId, userId });

  if (!address) {
    throw new Error("Address not found");
  }

  const deletedAddress = await Address.findByIdAndDelete(addressId, {
    new: true,
  });

  return deletedAddress;
};

export const setDefaultAddressService = async (userId, addressId) => {
   
  const address = await Address.findOne({ _id: addressId, userId });

  if (!address) {
    throw new Error("Address not found");
  }

  await Address.updateMany({ userId }, { isDefault: false });

  const defaultAddress = await Address.findByIdAndUpdate(
    addressId,
    { isDefault: true },
    { new: true },
  );

  return defaultAddress;
}
  
