import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, createNewUser, getUserID, UserByID, specialUser } from "../Controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/createNew", createNewUser);

router.get("/userid", getUserID);

router.get("/userid/new", specialUser);

router.get("/userid/:id", UserByID);

export default router;

// Upar se NEECHE EK ORDER MEIN EXECUTION HOTA HAI

// app.get("/userid/new", (req, res) => {
//       res.json({
//             success: true,
//             message: "Just testing",
//       });
// });