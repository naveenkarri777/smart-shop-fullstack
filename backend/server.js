import express from 'express'
import connectDB from './config/mongodb.js'
import cors from 'cors'
import colors from 'colors'
import 'dotenv/config'
import ConnectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import assistantroute from './routes/assistantRoute.js'


//App config
const app = express();
connectDB();
ConnectCloudinary();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/', (req, res) => {
  res.send("Api is working");
});

app.use("/api/user", userRouter);
app.use("/api/product",productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/assistant', assistantroute);

app.listen(port, () => {
  console.log(`✅Server is running on port ${port}`.bgYellow);
});
