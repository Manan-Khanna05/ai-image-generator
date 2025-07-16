import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/MongoDB.js";
import userRouter from "./routes/userRouter.js";
import { imageRouter } from "./routes/imageRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("API Working.."));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Running on PORT : ${PORT}`));
