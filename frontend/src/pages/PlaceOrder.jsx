import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotalCount";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    Cartitems,
    getCartAmount,
    backendUrl,
    token,
    currency,
    delivery_fee,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  // handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // select payment
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  // place order
  const handlePlaceOrder = async () => {
    try {
      
         // 🔐 check login before placing order
    if (!token) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }

      
      // if COD selected
      if (paymentMethod === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/placeordercod`,
          {
            items: Cartitems,
            amount: getCartAmount() + delivery_fee,
            address: formData,
          },
          {
             headers: { Authorization: `Bearer ${token}` }, 
          }
        );

        if (response.data.success) {
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error("Failed to place order.");
        }
        return;
      }

      // validate fields for online payments
      for (let key in formData) {
        if (!formData[key]) {
          toast.error(`Please fill in ${key}`);
          return;
        }
      }

      if (!paymentMethod) {
        toast.error("Please select a payment method.");
        return;
      }

      toast.info("Online payment integration coming soon!");
    } catch (err) {
      console.error(err);
      toast.error("Error placing order.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* ---------- Left Side --------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* Name fields */}
        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>

        {/* Email */}
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />

        {/* Street */}
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        {/* City & State */}
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        {/* Country and pincode */}
        <div className="flex gap-3">
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Pincode"
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        {/* Phone */}
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* ------------- Right Side ---------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
          <p className="text-gray-700 mt-2">
            Delivery Fee: {currency} {delivery_fee}
          </p>
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------------- Payment Method Selection ------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => handlePaymentSelect("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => handlePaymentSelect("razorpay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>

            {/* Cash on Delivery */}
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => handlePaymentSelect("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
