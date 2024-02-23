import express from "express";
import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  console.log(req.query);

  const keyword = req.query.keyword;
  console.log(keyword);

  const users = await User.find({});
  res.json({
    success: true,
    users: users,
  });
};

export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
  });

  res.status(201).json({
    success: true,
    message: "New user entered successfully",
  });
};

export const getUserID = async (req, res) => {
  // const {id} = req.body;
  // const user = await User.findById(id);

  // res.json({
  //       success: true,
  //       user,
  // })
  const { id } = req.query;
  //const user = await User.findById(id);
  console.log(req.params);
  res.json({
    success: true,
    user: {},
  });
};

export const UserByID = async (req, res) => {
  // const {id} = req.body;
  // const user = await User.findById(id);

  // res.json({
  //       success: true,
  //       user,
  // })
  const { id } = req.params;
  const user = await User.findById(id);
  //console.log(req.params);
  res.json({
    success: true,
    user,
  });
};

export const specialUser = (req, res) => {
  res.json({
    success: true,
    message: "Just testing",
  });
};
