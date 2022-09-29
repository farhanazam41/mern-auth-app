import express from "express";
import authRoutes from "./routes/auth-routes.js";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
const DOT_ENV = dotenv.config();

// connect to db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB CONNECTION ERROR: ", err));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRoutes);
app.listen(process.env.PORT, () => {
	console.log("Server is running on port 5000");
});
//commit..
