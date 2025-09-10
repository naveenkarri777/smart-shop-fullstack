import express from 'express'
import {addToCart,updateCart,getUserCart} from '../controller/cartController.js'
import auth from '../middlewares/auth.js'

const cartRouter = express.Router();

cartRouter.post("/addtocart",auth,addToCart);
cartRouter.post("/updatecart",auth,updateCart);
cartRouter.post("/getusercart",auth,getUserCart);

export default cartRouter;