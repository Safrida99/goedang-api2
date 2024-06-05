const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");


// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, quantity, date, price, total } = req.body;

//   Validation
  if (!name || !quantity || !date || !price || !total) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
// dynamic import nanoid
  let nanoid;
  try {
    const { nanoid: nanoidModule } = await import('nanoid');
    nanoid = nanoidModule;
  } catch (error) {
    console.error('Failed to import nanoid:', error);
  }
// Generate a unique product ID using nanoid
  const productId = nanoid();

// Create Product
  const product = await Product.create({
    _id: productId,
    user: req.user.uid,
    name,
    quantity,
    date,
    price,
    total,
    
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.uid }).exec();
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById( req.params.id );
  
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.uid) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
 
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.uid) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json({ message: "Product deleted." });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};