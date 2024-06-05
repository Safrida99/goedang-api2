const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(), // default value as nanoid
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    date: {
        type: String,
        required: [true, "Please add a date"],
        trim: true,
      },
    price: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    },
    total: {
      type: String,
      required: [true, "Please add a total"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;