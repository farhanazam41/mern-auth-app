import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		buttonText: "Submit",
	});

	const { name, email, password, phone, buttonText } = values;

	const handleChange = (name) => (event) => {
		// console.log(event.target.value);
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		// setValues({ ...values, buttonText: "Submitting" });
		console.log("values", values);
		axios({
			method: "POST",
			url: "http://localhost:5000/api/signup",
			data: { name, email, password, phone },
		})
			.then((response) => {
				console.log("SIGNUP SUCCESS", response);
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					phone: "",
					buttonText: "Submitted",
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("SIGNUP ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};

	const signUpForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					onChange={handleChange("name")}
					value={name}
					type='text'
					className='form-control'
				/>
			</div>
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
			<div className='form-group'>
				<label className='text-muted'>Phone</label>
				<input
					onChange={handleChange("phone")}
					value={phone}
					type='text'
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
				<h1 className='p-5 text-center'>Signup</h1>
				{signUpForm()}
			</div>
		</Layout>
	);
};

export default Signup;
