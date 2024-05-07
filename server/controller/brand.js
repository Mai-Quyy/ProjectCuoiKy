const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : " Cannot create new brand",
  });
});
const getBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response ? response : " Cannot get new brand",
  });
});
const updatedBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedBrand: response ? response : " Cannot update new brand",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : " Cannot delete new brand",
  });
});
module.exports = {
  createNewBrand,
  getBrand,
  updatedBrand,
  deleteBrand,
};
