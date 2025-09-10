import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, mess: "User already exists, please use a different E-mail" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, mess: "Please enter a valid user email" });
    }

    // validate password length
    if (password.length < 8) {
      return res.json({ success: false, mess: "Password must be at least 8 characters" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // ✅ save as password
    });

    const user = await newUser.save();

    // generate token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      mess: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mess: "Error in register user API" });
  }
};

// Login user (empty for now)
// Login user
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, mess: "User not found, please register first" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, mess: "Invalid email or password" });
    }

    // create token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      mess: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mess: "Error in login user API" });
  }
};


// Admin login (empty for now)
export const AdminLogin = async (req, res) => {
    try {
        const{email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password,process.env.JWT_SECRET);
          res.json({success:true,token});
        }else{
          res.json({
            success:false,
            mess : "incorrect email or password"
          })
        }
    } catch (error) {
          res.json({
            success:false,
            mess : "Error in admin login function"
          })
    }
};
