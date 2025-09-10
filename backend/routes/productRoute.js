import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controller/productController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const productRouter = express.Router();

// POST -> Add a product
productRouter.post("/addproduct",authMiddleware,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);

// GET -> List all products
productRouter.get("/listproducts", listProducts);

// DELETE -> Remove product by ID
productRouter.delete("/removeproduct/:id",authMiddleware,removeProduct);

// GET -> Get single product by ID
productRouter.get("/singleproduct/:id", singleProduct);

export default productRouter;
