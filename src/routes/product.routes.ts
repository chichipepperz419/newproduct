import {Router} from "express";
import { createProduct, getAllProducts, getOneProduct, updatedProducts } from "../controller/product.controller.js";
import upload from "../configuration/multer.js"

const ProductRouter = Router();
ProductRouter.post("/", upload.single("image"), createProduct)
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getOneProduct);
ProductRouter.patch("/:id", upload.single("image"), updatedProducts);

export default ProductRouter