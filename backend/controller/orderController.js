import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js';


// Placing orders using COD Method
export const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Create new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    // ✅ Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully with Cash on Delivery",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error placing COD order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Placing orders using Stripe Method
export const placeOrderStripe = async (req, res) => {

}

// Placing orders using Razorpay Method
export const placeOrderRazorpay = async (req, res) => {

}

// All Orders data for Admin Panel
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("userId"); 
    // populate if you want user details too
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Update order status from Admin
export const updateStatus = async (req, res) => {

}
