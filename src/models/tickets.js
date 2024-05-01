const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Ajusta esto según el nombre del modelo de tu producto
        required: true,
      },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  purchase_datetime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

module.exports = TicketModel;
