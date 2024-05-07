const Order = require("../models/order");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id).select("cart");
  const response = await Order.create(req.body);
  return res.json({
    success: userCart ? true : false,
    createdBlog: userCart ? userCart : " Cannot create order",
  });
});

module.exports = {
  createOrder,
};
