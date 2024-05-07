const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    brand: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model without the leading space in the model name
module.exports = mongoose.model("ProductCategory", productCategorySchema);
