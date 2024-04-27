// const order = require("../models/order");
// const Order = require("../models/order");
// const User = require("../models/user");
// const asyncHandler = require("express-async-handler");

// const createOrder = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const userCart = await User.findById(_id)
//     .select("cart")
//     .populate("cart", "title price");
//   const products = userCart?.cart?.map((el) => ({
//     product: el.product._id,
//     count: el.quantity,
//     color: el.color,
//   }));
//   let total = userCart?.cart?.reduce(
//     (sum, el) => el.product.price * el.quantity + sum,
//     0
//   );
//   const createData = { products, total, orderBy: _id };

//   if (coupon) {
//     const selectedCoupon = await Coupon.findById(coupon);
//     total =
//       Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) *
//         1000 || total;
//     createData.total = total;
//     createData.coupon = coupon;
//   }
//   const rs = await Order.create({ createData });
//   return res.json({
//     success: rs ? true : false,
//     rs: rs ? rs : "Something went wrong",
//   });
// });
// const updateStatus = asyncHandler(async (req, res) => {
//   const { oid } = req.params;
//   const { status } = req.body;
//   if (!status) throw new Error("Missing status");
//   const reponse = await Order.findByIdAndUpdate(oid, { status }, { new: true });

//   return res.json({
//     success: reponse ? true : false,
//     reponsers: reponse ? reponse : "Something went wrong",
//   });
// });
// const getUserOrder = asyncHandler(async (req, res) => {
//   const { _id } = req.user;

//   const reponse = await Order.find({ orderBy: _id });

//   return res.json({
//     success: reponse ? true : false,
//     reponsers: reponse ? reponse : "Something went wrong",
//   });
// });
// const getOrder = asyncHandler(async (req, res) => {
//   const reponse = await Order.find();

//   return res.json({
//     success: reponse ? true : false,
//     reponsers: reponse ? reponse : "Something went wrong",
//   });
// });
// module.exports = {
//   createOrder,
//   updateStatus,
//   getUserOrder,
//   getOrder,
// };
