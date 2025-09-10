import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // ✅ fallback to localStorage if prop is empty
  const authToken = token || localStorage.getItem("token");

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/listproducts`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      if (!authToken) {
        toast.error("No token found. Please login again.");
        return;
      }

      const response = await axios.delete(
        `${backendUrl}/api/product/removeproduct/${id}`,
        {
          headers: {
            token: authToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-2 font-medium text-lg">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 font-bold border-b">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border-b"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-12 h-12 object-cover"
            />
            <p>{item.name?.replace(/"/g, "")}</p>
            <p>{item.category?.replace(/"/g, "")}</p>
            <p>₹ {item.price}</p>
            <p
              className="text-red-500 cursor-pointer text-lg text-right md:text-center"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
