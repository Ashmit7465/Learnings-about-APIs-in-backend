import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "learnAPIs",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error));
};
