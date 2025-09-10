import mongoose from "mongoose";
import colors from "colors";
import 'dotenv/config'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNE_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database connected successfully".bgCyan);
  } catch (error) {
    console.error(`❌ Error connecting to database: ${error.message}`.red.bold);
    process.exit(1); // exit process with failure
  }
};

export default connectDB;
