const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: [String], required: false },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
