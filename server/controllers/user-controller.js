import User from "../models/user-model.js";
import HttpError from "../models/error-model.js";

// export const getUserById = async (req, res, next) => {
//     const userId  = req.params.id;
//     console.log("userId", userId);
//     User.findOne(userId).exec((err, user,next) => {
//         if(err || !user){
//             return res.status(404).json({
//                 error: 'User not found'
//             });

//         }
//         const { _id, name, email, role, phone } = user;
//         const userData = {_id, name, email, role, phone }
//         res.status(200).json(userData)
//     });
// }

export const getUserById = async (req, res, next) => {
	const userId = req.params.id;
	console.log("userId", userId);

	let userInfo;

	try {
		userInfo = await User.findById(userId);
	} catch (err) {
		// let err
		if (!userInfo) {
			err = new HttpError("User not found", 404);
			return next(err);
		}
		err = new HttpError("user not unexpected error", 500);
		return next(err);
	}

	const { _id, name, email, role, phone } = userInfo;
	const userData = { _id, name, email, role, phone };
	res.status(200).json(userData);
};

const validPhone = (phone) => {
	const re = /^\d{10}$/;
	return re.test(phone);
};

export const updateUserById = async (req, res, next) => {
	const { name, email, role, phone, password } = req.body;
	const userId = req.params.id;
	let userInfo;
	try {
		userInfo = await User.findById(userId);

		console.log("userInfo", userInfo);
		// const updatedUser = new User({
		//     name: name,
		//     email: email,
		//     phone: phone,
		//     role: role
		// })
		// userInfo.save((err, updateUser) => {
		//     if(err){
		//         console.log('update err', err);
		//         res.status(400).json('update failed')
		//     }
		//     res.json(updateUser)
		// })

		// res.status(203).json('user saved')
		// const updatedUser = new User({ name, email, password ,phone});
		// User.updateOne
		// updatedUser.save((err,user) => {
		//     console.log(user)
		//     return res.status(203).json(user)
		// });
	} catch (err) {
		if (!userInfo) {
			err = new HttpError("User not found", 404);
			return next(err);
		}
	}

	if (!name) {
		const error = new HttpError("Name is required", 400);
		return next(error);
	} else {
		userInfo.name = name;
	}

	if (password) {
		if (password.length < 6) {
			const error = new HttpError(
				"Password should be min 6 characters long",
				400
			);
			return next(error);
		} else {
			userInfo.password = password;
		}
	}

	if (phone) {
		let invalidPhoneStart = "123";
		if (!validPhone(phone)) {
			const error = new HttpError("Phone should be 10 digits", 400);
			return next(error);
		} else if (phone.startsWith(invalidPhoneStart)) {
			const error = new HttpError("Phone number not allowed", 400);
			return next(error);
		} else {
			userInfo.phone = phone;
		}
	}

	userInfo.name = name;
	userInfo.email = email;
	userInfo.role = role;
	userInfo.phone = phone;
	console.log("code ran here but crashed after save method");
	try {
		await userInfo.save();
		userInfo.hashed_password = undefined;
		console.log("saved");
		console.log("data", userInfo);
		res.json(userInfo);
	} catch (err) {
		const error = new HttpError("User not updated", 400);
		next(error);
	}
};

export const adminMiddleware = (req, res, next) => {
	console.log("req.auth", req.auth);
	User.findById({ _id: req.auth._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		if (user.role !== "admin") {
			return res.status(400).json({
				error: "Admin resource. Access denied.",
			});
		}

		req.profile = user;
		next();
	});
};

// const user = new User({ name, email, password ,phone});

// with findOne
// export const updateUserById = (req, res) => {
//     // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
//     const { name, password,phone,role } = req.body;
//     const userId = req.params.id

//     User.findOne({ _id: userId }, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 error: 'User not found'
//             });
//         }
//         if (!name) {
//             return res.status(400).json({
//                 error: 'Name is required'
//             });
//         } else {
//             user.name = name;
//         }

//         if (password) {
//             if (password.length < 6) {
//                 return res.status(400).json({
//                     error: 'Password should be min 6 characters long'
//                 });
//             } else {
//                 user.password = password;
//             }
//         }

//         user.save((err, updatedUser) => {
//             if (err) {
//                 console.log('USER UPDATE ERROR', err);
//                 return res.status(400).json({
//                     error: 'User update failed'
//                 });
//             }
//             updatedUser.hashed_password = undefined;
//             updatedUser.salt = undefined;
//             res.json(updatedUser);
//         });
//     });
// };
