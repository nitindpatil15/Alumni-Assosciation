import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    DOB: {
      type: Date,
    },
    interest: [
      {
        type: String,
      },
    ],
    branch: {
      type: String,
    },
    batch: {
      type: String,
    },
    prn: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    role: ["Student", "Alumni", "Institution", "Faculty"],
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("provided Password: ", password);
  console.log("Store hash password: ", this.password);
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
  // Define the payload for the access token
  const payload = {
    _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
  };

  // Sign the access token using a secret key
  const accessToken = jwt.sign(payload, ACCESSTOKEN_SECRET_KEY, { expiresIn: '60m' }); // Adjust expiry as needed

  return accessToken;
};


export const User = mongoose.model("User", userSchema);
