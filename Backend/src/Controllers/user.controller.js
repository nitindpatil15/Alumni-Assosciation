import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js";
import { User } from "../Models/User.js";

// Generate AccessToken Functionality 
export const accesstokenGenerate = async(userId)=>{
  const userToken = await User.findById(userId)
  const accessToken = userToken.generateAccessToken()
  console.log("From genrate accessToken",accessToken)
  return {accessToken}
}

// User registration 
export const userRegister = async (req, res) => {
  try {
    const { name, mobile, email, password, role } = req.body;
    if (!name || !mobile || !email || !password || !role) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existedUser) {
      res.status(400).json({ message: "Mobile.No or Email already exists." });
      return;
    }

    const createduser = await User.create({
      name,
      email,
      password,
      mobile,
      role,
    });
    if (!createduser) {
      res.status(400).json({ message: "Failed to create User." });
      return;
    }
    const user = await User.findById(createduser?._id).select("-password");

    return res
      .status(200)
      .json({ data: user, message: "User Registartion Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
    return error;
  }
};

// User Login 
export const userlogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  if (!password || (!mobile && !email)) {
    res.status(400).json({ message: "All Fields are Required." });
    return;
  }
  try {
    const userDetail = await User.findOne({
      $or: [{ email }, { mobile }],
    })
    if (!userDetail) {
      res.status(400).json({ message: "Mobile.No or Email already exists." });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, userDetail.password);
    if (!isValidPassword) {
      console.error("Invalid Password");
      return;
    }

    const {accessToken} = await accesstokenGenerate(userDetail._id)
    console.log(accessToken)
    const loggedUser = await User.findById(userDetail._id).select("-password")

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .json({ data: loggedUser, token: accessToken });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message || "Server Error." });
    return error;
  }
};

export const getCurrentUser = async(req,res)=>{
  const user = req.user
  try {
    const response = await User.findById(user._id)
    console.log(response.data)
    return res.status(200).json(response)
  } catch (error) {
    
  }
}