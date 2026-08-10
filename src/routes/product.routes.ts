import {Router} from "express";
import { createProduct, getAllProducts, getOneProduct, updatedProducts } from "../controller/product.controller.js";
import upload from "../configuration/multer.js"

const ProductRouter = Router();
ProductRouter.post("/:userId", upload.single("image"), createProduct)
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:productId", getOneProduct);
ProductRouter.patch("/update-product/:id", updatedProducts);

export default ProductRouter