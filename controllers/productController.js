const Product = require('../models/Product');

const addProduct = async (req, res) => {
  // const { name, quantity, rate } = req.body;

  try {
    const { products } = req.body;
    await Product.insertMany(products);
    res.status(200).json({ message: 'Products saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save products', error: error.message });
  }
};

module.exports = { addProduct };
