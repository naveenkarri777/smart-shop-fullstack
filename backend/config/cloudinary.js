import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config';
import colors from 'colors';

const ConnectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log("✅ Cloudinary connected".bgMagenta);
};

export default ConnectCloudinary;
export { cloudinary };
