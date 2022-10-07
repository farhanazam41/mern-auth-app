import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../authutils/authUtils";
import { useNavigate } from "react-router-dom";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		buttonText: "Submit",
	});
	const navigate = useNavigate();
	const { email, password, buttonText } = values;

	useEffect(() => {

		const userCookieExists = isAuth();
		if(userCookieExists){
			navigate("/home");
		}

	},[navigate])

	// const isPathSignIn = window.location.pathname === "/signin" || "/signup";
	// useEffect(() => {
		
	// 	if (userValid && isPathSignIn) {
	// 		window.location.href = "/home";
	// 	}
	// },[isPathSignIn,userValid])
	const handleChange = (name) => (event) => {
		// console.log(event.target.value);
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, buttonText: "Submitting" });
		console.log("values", values);
		axios({
			method: "POST",
			url: "http://localhost:5000/api/signin",
			data: { email, password },
		})
			.then((response) => {
				console.log("SIGNUP SUCCESS", response);
				authenticate(response, () => {
					setValues({
						...values,
						email: "",
						password: "",
						buttonText: "Submit",
					});
					console.log("response", response);
					const isSubscriber = isAuth() && isAuth().role === "subscriber";
					const isAdmin = isAuth() && isAuth().role === "admin";
					toast.success(response.data.message);
					if(isAdmin){
						navigate("/admin");
					}else{
						navigate("/home");
					}
				});
			})
			.catch((error) => {
				console.log("SIGNUP ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};

	const signInForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					onChange={handleChange("email")}
					value={email}
					type='email'
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					onChange={handleChange("password")}
					value={password}
					type='password'
					className='form-control'
				/>
			</div>
			<div>
				<button className='btn btn-primary'>{buttonText}</button>
			</div>
		</form>
	);
	return (
		<Layout>
			<div className='col-md-6 offset-md-3'>
				<ToastContainer />
				<h1 className='p-5 text-center'>SignIn</h1>
				{signInForm()}
			</div>
		</Layout>
	);
};

export default Signin;
