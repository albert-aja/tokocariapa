const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  jumlah: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("Cart", cartSchema);
