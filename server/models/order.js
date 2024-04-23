const mongoose = require("mongoose"); // Erase if already required

var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: moongse.Types.OjectId, ref: "Product" },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Succeed"],
  },
  total: Number,
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "coupon",
  },
  orderBy: {
    type: mongoose.Types.OjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Order", orderSchema);
