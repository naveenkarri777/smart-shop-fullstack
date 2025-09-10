import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    // handle images
    const images = [
      req.files.image1 && req.files.image1[0],
      req.files.image2 && req.files.image2[0],
      req.files.image3 && req.files.image3[0],
      req.files.image4 && req.files.image4[0],
    ].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    // parse sizes
    const parsedSizes = sizes 
      ? (typeof sizes === "string" ? JSON.parse(sizes) : sizes) 
      : [];

    // build product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,                        // match schema (subcategory, not subCategory)
      bestseller: bestseller === "true",
      size: parsedSizes,                  // ✅ schema expects `size`, not `sizes`
      images: imagesUrl                   // ✅ schema expects `images`, not `image`
    };

    const product = new Product(productData);
    await product.save();

    res.json({ success: true,product });
  } catch (error) {
    console.error("Error in addProduct API:", error);
    res.json({ success: false, message: error.message });
  }
};




const listProducts = async (req,res) => {
    try {
    const products = await Product.find({});
    res.json({ success: true,message : "list products" ,products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🟡 Deleting product with ID:", id);

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  
  } catch (error) {
    console.error("Error in removeProduct:", error);
    res.json({ success: false, message: error.message });
  }
}



const singleProduct = async (req,res) => {
     try {
    // If you pass id in URL like /api/product/singleproduct/:id
    const { id } = req.params;  

    const product = await Product.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export { addProduct, listProducts, singleProduct, removeProduct };
