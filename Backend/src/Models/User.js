import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength:5
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    mobile: {
      type: Number,
      require: true,
      unique:true,
      maxlength:10
    },
    avatar:{
      type:String
    },
    coverImage:{
      type:String
    },
    city:{
      type:String
    },
    DOB: {
      type: Date,
    },
    gender:{
      type:String
    },
    role: {
      type: String,
      enum: ["Student", "Alumni", "Admin"],
    },
    password: {
      type: String,
      required: true,
      minlength:8
    },
    interest: [
      {
        type: String,
      },
    ],

    // Current Year 
    current_branch: {
      type: String,
    },
    passing_year: {
      type: String,
    },
    current_prn: {
      type: Number,
    },
    admission_year:{
      type:Date
    },

    // Past Qualification for alumni only
    degree_passing_year :{
      type:String
    },
    branch:{
      type:String
    },
    alumni_prn:{
      type:Number
    },
    accessToken: {
      type: String,
    },

    // Experience  and other Activities
    current_company:{
      type:String
    },
    position:{
      type:String
    },
    exp_in_years:{
      type:Number
    },

    internship_company:{
      type:String
    },
    internship_position:{
      type:String
    },
    internship_duration:{
      type:String
    },

    event_registration:[
      {
        type:Schema.Types.ObjectId,
        ref:"Event"
      }
    ]
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
