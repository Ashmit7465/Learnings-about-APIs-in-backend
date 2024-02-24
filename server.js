import cookieParser from "cookie-parser";
import { app } from "./app.js";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js"
import express from "express"
import { errorMiddleware } from "./Middlewares/error.js";
import cors from "cors";

//using middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: [process.env.FRONTEND_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

//using routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute);

app.get("/", (req, res) => {
  res.send("<h1>Nicely Connected</h1>");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is working successfully on port 4000`);
});
