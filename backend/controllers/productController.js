import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET/api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc        Fetch single product
// @route       GET/api/product/:id
// @access      Public
const getProductById = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  // console.log('Vul');
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc        del a product
// @route       del/api/products/:id
// @access      Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc        create a product
// @route       post/api/products
// @access      Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'HDD',
    price: 1000,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'San Disk',
    category: 'Storage',
    countInStock: 2,
    numReviews: 9,
    description: 'Super Fast',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc        update a product
// @route       put/api/products/:id
// @access      Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
