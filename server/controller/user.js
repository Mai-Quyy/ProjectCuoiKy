const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  // check để đỡ chậm cho db
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      sucess: false,
      mes: "Missing Inputs",
    });
  const reponse = await User.create(req.body);
  return res.status(200).json({
    sucess: reponse ? true : false,
    reponse,
  });
});
module.exports = {
  register,
};
UpdateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.User;
  if (!req.body.address) throw new Error("Missing inputs");
  const reponse = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: reponse ? true : false,
    updatedUser: reponse ? reponse : "Some thing went wrong ",
  });
});
updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.User;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing inputs");
  const user = await User.findById(_id);
  const alreadyProduct = user?.cart?.find((el) => el.product.toSring() === pid);
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const reponse = await user.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
    } else {
      const reponse = await User.findByIdAndDelete(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
    }
  } else {
    const reponse = await User.findByIdAndDelete(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
  }
  return res.status(200).json({
    success: reponse ? true : false,
    updatedUser: reponse ? reponse : "Some thing went wrong ",
  });
});
