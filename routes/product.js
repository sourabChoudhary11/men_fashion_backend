import express from "express"
import {GetAllProducts, GetSpecificProduct, GetAllCategories, GetSpecificCategoryProducts, AddProduct} from "../controllers/product.js"

const productRoute = express.Router();

productRoute.get("/all", GetAllProducts)
productRoute.get("/:id", GetSpecificProduct)
productRoute.get("/categories", GetAllCategories)
productRoute.get("/category/:category", GetSpecificCategoryProducts)
productRoute.post("/new", AddProduct)

export default productRoute