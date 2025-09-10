import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: [String], required: true },  // e.g. ["S", "M", "L"]
  description: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
  images: { type: [String], required: true } // store Cloudinary URLs
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
