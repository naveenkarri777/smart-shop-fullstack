import { 
  placeOrderCod,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus 
} from "../controller/orderController.js";

import express from 'express';
import adminAuth from '../middlewares/authMiddleware.js';
import userAuth from '../middlewares/auth.js';

 const orderRouter = express.Router();

// Admin features
orderRouter.post('/allorders', adminAuth, allOrders);
orderRouter.post('/updatestatus', adminAuth, updateStatus);

// Payment features
orderRouter.post('/placeordercod', userAuth, placeOrderCod);
orderRouter.post('/placeorderstripe', userAuth, placeOrderStripe);
orderRouter.post('/placeorderrazorpay', userAuth, placeOrderRazorpay);

// User features
orderRouter.post('/userorders', userAuth, userOrders);

export default orderRouter;
