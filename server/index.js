import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.connection.js";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";
import recipeRouter from "./routes/recipe.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"))


//routes
app.use("/api/auth", authRouter);
app.use("/api/recipe",recipeRouter)
app.listen(port, (req, res) => {
  connectDB();
  console.log(`server  is running on ${port}`);
});
