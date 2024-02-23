import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./data/database.js";
import {config} from "dotenv"

config({
      path: "./data/config.env" 
});

export const app = express();

connectDB();




