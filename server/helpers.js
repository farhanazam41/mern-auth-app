import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (err, req, res, next) => {
	if (res & res.headerSent) {
		return next(err);
	} else {
		res
			.status(err.code || 500)
			.json({ message: err.message || "An unknown error occurred!" });
	}
};

export const verifyToken = (req, res, next) => {
	const { authorization } = req.headers;

	console.log(authorization);
	if (authorization) {
		console.log("authorization", authorization);
		const token = authorization.split(" ")[1];
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err) => {
				if (err) {
					return res.status(403).json({ message: "Forbidden" });
				} else {
					console.log("req", req.user);
					next();
				}
			});
		}
	} else {
		res.status(401).send({ erroMessage: "Unauthorized" });
	}
};

// export const errorHandler = () => {
//     return function (err, req, res, next){
//        if(err && err.name === "UnauthorizedError") {
//            res.status(401).json({
//              error: "Access denied. No token provided"
//            });
//          } else {
//            next(err);
//          }
//     }
//    };
