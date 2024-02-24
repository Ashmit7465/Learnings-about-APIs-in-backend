import express from "express";
import { Task } from "../models/task.js";
import ErrorHandler from "../Middlewares/error.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title: title,
      description: description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Task doesn't Exist", 404));
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Task doesn't Exist", 404));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};