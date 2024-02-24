import express from "express";
import { Task } from "../models/task.js";
import {
  createTask,
  getMyTask,
  updateTask,
  deleteTask,
} from "../Controllers/task.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/createTask", isAuthenticated, createTask);

router.get("/viewMyTasks", isAuthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
