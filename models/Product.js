import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name should not be more than 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description should not be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be below 0'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ["watch", "shirt", "shoes", "perfume", "jeans"],
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    maxlength: [50, 'Brand name should not be more than 50 characters'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be less than 0'],
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', ProductSchema)

export default Product
