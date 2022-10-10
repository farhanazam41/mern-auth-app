import express from "express";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { errorHandler } from "./helpers.js";

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

// route middleware
app.use("/api", authRoutes);
app.use("/user", userRoutes);
app.use( (err, req, res, next) => {
	if(res.headerSent){
		console.log(' header sent in here')

	  return next(err); // what does this line do?  I don't understand it yet. 
	}else{
		console.log('else in here')
	  res.status(err.code || 500).json({message: err.message || 'An unknown error occurred!'});
	}
  });
app.listen(process.env.PORT, () => {
	console.log("Server is running on port 5000");
});
//commit..
