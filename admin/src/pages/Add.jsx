import React, { useState } from "react";
import assets from "../assets/assets"; // adjust import
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Product states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Size toggle
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("bestseller", bestseller);
      sizes.forEach((size) => formData.append("sizes[]", size));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/addproduct`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      toast.error("Something went wrong while adding product.");
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={handleSubmit}
    >
     {/* Upload Images */}
<p className="mb-2">Upload Image</p>

<div className="flex gap-2">
  {[1, 2, 3, 4].map((num) => (
    <div
      key={num}
      onClick={() =>
        alert(
          "🖼 Image upload is disabled in this demo.\nCloud storage services are not configured."
        )
      }
      className="cursor-not-allowed"
    >
      <img
        className="w-20 opacity-60"
        src={assets.upload_area}
        alt={`upload-${num}`}
      />
    </div>
  ))}
</div>

<p className="text-xs text-gray-500 mt-2">
  🖼 Image upload is disabled in the demo version.
</p>


      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          type="text"
          placeholder="Type here..."
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          placeholder="Write content here..."
        />
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2">Price</p>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          type="number"
          placeholder="Enter price..."
        />
      </div>

      {/* Product Category */}
      <div>
        <p className="mb-2">Product category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Sub Category */}
      <div>
        <p className="mb-2">Sub category</p>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Select Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 border rounded-md cursor-pointer ${sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-slate-200 text-black"
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded-md"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
