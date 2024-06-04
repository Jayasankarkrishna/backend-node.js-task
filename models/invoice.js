

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      rate: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
