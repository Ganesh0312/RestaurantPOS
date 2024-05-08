const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    subTotal: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    paymentMode: {
      type: String,
      require: true,
    },
    cartItem: {
      type: Array,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

const Bils = mongoose.model("Bills", billSchema);

module.exports = Bils;
