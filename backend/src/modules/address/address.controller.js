import {createAddressService, getAllAddressesService, updateAddressService, deleteAddressService, setDefaultAddressService} from './address.service.js';




export const createAddressController = async (req, res) => {
  try{
    const address = await createAddressService(req.body);
    return res.status(201).json({success: true,message:"Address created successfully", address});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}

export const getAllAddressesController = async (req, res) => {
  try{
    const addresses = await getAllAddressesService();
    return res.status(200).json({success: true,message:"All addresses fetched successfully", addresses});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}

export const updateAddressController = async (req, res) => {
  try{
    const address = await updateAddressService(req.params.id, req.body);
    return res.status(200).json({success: true,message:"Address updated successfully", address});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}

export const deleteAddressController = async (req, res) => {
  try{
    const address = await deleteAddressService(req.params.id);
    return res.status(200).json({success: true,message:"Address deleted successfully", address});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}

export const setDefaultAddressController = async (req, res) => {
  try{
    const address = await setDefaultAddressService(req.params.id);
    return res.status(200).json({success: true,message:"Address set as default successfully", address});
  }catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}
