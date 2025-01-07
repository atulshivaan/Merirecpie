import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.connection.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

//middleware
app.use(cors());
app.use(bodyParser.json());


//routes
app.use("/api/auth", authRouter);
app.listen(port, (req, res) => {
  connectDB();
  console.log(`App is running on ${port}`);
});
