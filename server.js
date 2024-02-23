import { app } from "./app.js";
import userRoute from "./routes/user.js";
import express from "express"
//using middleware
app.use(express.json());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("<h1>Nicely Connected</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working successfully on port 4000`);
});
