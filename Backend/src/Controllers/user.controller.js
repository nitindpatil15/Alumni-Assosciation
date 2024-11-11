import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js";
import { User } from "../Models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

// Generate AccessToken Functionality
export const accesstokenGenerate = async (userId) => {
  try {
    const userToken = await User.findById(userId);
    const accessToken = userToken.generateAccessToken();
    console.log("From genrate accessToken", accessToken);
    return { accessToken };
  } catch (error) {
    return new ApiError(500, error?.message || "Server Error");
  }
};

// User registration
export const StudentRegister = async (req, res) => {
  try {
    const { name, mobile, email, password, role } = req.body;
    if (!name || !mobile || !email || !password) {
      return new ApiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existedUser) {
      return new ApiError(401, "Mobile.No or Email already exists.");
    }

    const createduser = await User.create({
      name,
      email,
      password,
      mobile,
      role: "Student",
    });
    if (!createduser) {
      return new ApiError(402, "Failed to create User.");
    }
    const user = await User.findById(createduser?._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponce(200, "User created successfully", user));
  } catch (error) {
    return new ApiError(500, error?.message || "Server Error");
  }
};

export const AlumniRegister = async (req, res) => {
  try {
    const { name, mobile, email, password, role } = req.body;
    if (!name || !mobile || !email || !password) {
      return new ApiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existedUser) {
      return new ApiError(401, "Mobile.No or Email already exists.");
    }

    const createduser = await User.create({
      name,
      email,
      password,
      mobile,
      role: "Alumni",
    });
    if (!createduser) {
      return new ApiError(402, "Failed to create User.");
    }
    const user = await User.findById(createduser?._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponce(200, "User created successfully", user));
  } catch (error) {
    return new ApiError(500, error?.message || "Server Error");
  }
};

// User Login
export const studentlogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  if (!password || (!mobile && !email)) {
    return new ApiError(401, "All Fields are Required.");
  }
  try {
    const userDetail = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (!userDetail) {
      return new ApiError(402, "Mobile.No or Email already exists.");
    }
    if (userDetail.role !== "Student") {
      return new ApiError(403, "You are not a Student.");
    }
    const isValidPassword = await bcrypt.compare(password, userDetail.password);
    if (!isValidPassword) {
      return new ApiError(402, "Invalid Password");
    }

    const { accessToken } = await accesstokenGenerate(userDetail._id);
    console.log(accessToken);
    const loggedUser = await User.findById(userDetail._id).select("-password");

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .json(
        new ApiResponce(
          200,
          { loggedUser, accessToken },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return new ApiError(500, error?.message || "Server Error.");
  }
};

export const Alumnilogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  if (!password || (!mobile && !email)) {
    return new ApiError(401, "All Fields are Required.");
  }
  try {
    const userDetail = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (!userDetail) {
      return new ApiError(402, "Mobile.No or Email already exists.");
    }
    if (userDetail.role !== "Alumni") {
      return new ApiError(403, "You are not a Alumni.");
    }
    const isValidPassword = await bcrypt.compare(password, userDetail.password);
    if (!isValidPassword) {
      return new ApiError(402, "Invalid Password");
    }

    const { accessToken } = await accesstokenGenerate(userDetail._id);
    console.log(accessToken);
    const loggedUser = await User.findById(userDetail._id).select("-password");

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .json(
        new ApiResponce(
          200,
          { loggedUser, accessToken },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return new ApiError(500, error?.message || "Server Error.");
  }
};

export const Adminlogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  if (!password || (!mobile && !email)) {
    return new ApiError(401, "All Fields are Required.");
  }
  try {
    const userDetail = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (!userDetail) {
      return new ApiError(402, "Mobile.No or Email already exists.");
    }
    if (userDetail.role !== "Admin") {
      return new ApiError(403, "You are not a Faculty/Institution.");
    }
    const isValidPassword = await bcrypt.compare(password, userDetail.password);
    if (!isValidPassword) {
      return new ApiError(402, "Invalid Password");
    }

    const { accessToken } = await accesstokenGenerate(userDetail._id);
    console.log("AccessToken",accessToken);
    const loggedUser = await User.findById(userDetail._id).select("-password");

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .json(
        new ApiResponce(
          200,
          { loggedUser, accessToken },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return new ApiError(500, error?.message || "Server Error.");
  }
};

// Fetch Current User
export const getCurrentUser = async (req, res) => {
  const user = req.user._id;
  try {
    const response = await User.findById(user);
    if (!response) {
      return new ApiError(401, "User not Found");
    }
    console.log(response);
    return res
      .status(200)
      .json(new ApiResponce(200, response, "Fetched current User"));
  } catch (error) {
    return new ApiError(500, error?.message || "Server Error");
  }
};

// Basic Details
export const updateBasicDetails = async (req, res) => {
  const { mobile, city, email, interest } = req.body;
  if (!mobile || !city || !email || !interest) {
    return new ApiError(401, "All Fields are Required!!!");
  }
  try {
    const updateDetails =
      ({
        $set: {
          mobile,
          city,
          email,
          interest,
        },
      },
      { new: true });

    if (!updateDetails) {
      return new ApiError("Something went wrong !! Try again...");
    }

    return res.status(200).json(200, updateDetails, "basic details Updated");
  } catch (error) {
    return new ApiError(500, `Server Error: ${error}`);
  }
};

// User Logout
export const userlogout = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return new ApiError(401, "Unauthorized User");
    }
    return res
      .status(200)
      .clearCookie("accessToken")
      .json(new ApiResponce(200, "User logged out successfully"));
  } catch (error) {
    return new ApiError(500, error?.message || "Server Error");
  }
};
