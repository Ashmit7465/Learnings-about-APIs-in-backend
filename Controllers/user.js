import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../Middlewares/error.js";

// export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    sendCookie(user, res, "User Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// export const register = async (req, res) => {

//   const {name, email, password} = req.body;
//   let user = await User.findOne({email});

//   if(user)
//   {
//     return res.status(404).json({
//       success: false,
//       message: "User Already Exists",
//     })
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   user = await User.create({
//     name: name,
//     email: email,
//     password: hashedPassword,
//   });

//   const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

//   res.status(201).cookie("token", token, {
//     httpOnly: true,
//     maxAge: 15 * 60 * 1000,
//   }).json({
//     success: true,
//     message: "User Registered Successfully",
//   })
// };

// export const getMyProfile = async (req, res) => {

// const { token } = req.cookies;
// console.log(token);

//   if (!token) {
//     return res.status(404).json({
//       success: false,
//       message: "Please Log In to view your profile",
//     });
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//   const user = await User.findById(decodedData._id);

//   res.status(200).json({
//     success: true,
//     user,
//   });

// };

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
      message: "User Logged out successfully",
    });
};
