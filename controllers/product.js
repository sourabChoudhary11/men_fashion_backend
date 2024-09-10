import Product from "../models/Product.js";

const GetAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).select(
      "name price brand stock rating images",
    );
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};

const GetSpecificProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const GetAllCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    next(err);
  }
};

const GetSpecificCategoryProducts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};


const AddProduct =  async (req, res, next) => {
    try {
      const products = await Product.insertMany();
      res.status(201).json({
        success: true,
        message: "product created successfully"
      });
    } catch (err) {
      next(err);
    }
  };

export {
  GetAllProducts,
  GetSpecificProduct,
  GetAllCategories,
  GetSpecificCategoryProducts,
  AddProduct
};
