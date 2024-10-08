import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js";
import { User } from "../Models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

// Generate AccessToken Functionality 
export const accesstokenGenerate = async(userId)=>{
  try {
    const userToken = await User.findById(userId)
    const accessToken = userToken.generateAccessToken()
    console.log("From genrate accessToken",accessToken)
    return {accessToken}
  } catch (error) {
    throw new ApiError(500,error?.message || "Server Error")
  }
}

// User registration 
export const userRegister = async (req, res) => {
  try {
    const { name, mobile, email, password, role } = req.body;
    if (!name || !mobile || !email || !password || !role) {
      throw new ApiError(400,"All fields are required.")
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existedUser) {
      throw new ApiError(401,"Mobile.No or Email already exists.")
    }

    const createduser = await User.create({
      name,
      email,
      password,
      mobile,
      role,
    });
    if (!createduser) {
      throw new ApiError(402,"Failed to create User.")
    }
    const user = await User.findById(createduser?._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponce(200, "User created successfully", user));

  } catch (error) {
    throw new ApiError(500,error?.message || "Server Error")
  }
};

// User Login 
export const userlogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  if (!password || (!mobile && !email)) {
    throw new ApiError(401,"All Fields are Required.")
  }
  try {
    const userDetail = await User.findOne({
      $or: [{ email }, { mobile }],
    })
    if (!userDetail) {
      throw new ApiError(402,"Mobile.No or Email already exists.")
    }
    const isValidPassword = await bcrypt.compare(password, userDetail.password);
    if (!isValidPassword) {
      throw new ApiError(402,"Invalid Password")
    }

    const {accessToken} = await accesstokenGenerate(userDetail._id)
    console.log(accessToken)
    const loggedUser = await User.findById(userDetail._id).select("-password")

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .json(new ApiResponce(200,{loggedUser,accessToken },"User Logged In Successfully"));
  } catch (error) {
    console.log(error)
    throw new ApiError(500,error?.message || "Server Error.")
  }
};

// Fetch Current User 
export const getCurrentUser = async(req,res)=>{
  const user = req.user._id
  try {
    const response = await User.findById(user)
    if(!response){
      throw new ApiError(401,"User not Found")
    }
    console.log(response.data)
    return res.status(200).json(new ApiResponce(200,response,"Fetched current User"))
  } catch (error) {
    throw new ApiError(500,error?.message || "Server Error")
  }
}

// User Logout
export const userlogout = async (req, res) => {
  const userId = req.user._id
  try {
    const user = await User.findById(userId)
    if(!user){
      throw new ApiError(401,"Unauthorized User")
    }
    return res.status(200)
    .clearCookie("accessToken")
    .json(new ApiResponce(200,"User logged out successfully"))
  } catch (error) {
    throw new ApiError(500,error?.message || "Server Error")
  }
}