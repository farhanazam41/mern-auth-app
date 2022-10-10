import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { isAuth, getCookie ,signout} from "../authutils/authUtils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function HomePage() {
	const [values, setValues] = useState({
		name: "",
		phone: "",
		email: "",
		role: "",
	});
    const navigate = useNavigate();
	const { name, phone, email, role } = values;

	//   const navigate = useNavigate();
	// 	const userCookieExists = isAuth();
	useEffect(() => {
		const token = getCookie("token");
		const getAccountSettings = async () => {
			try {
				const response = await axios({
					method: "GET",
					url: "http://localhost:5000/user/getuser/633d36893d955b60db55a250",
					headers: {
						Authorization: `Bearer ${token}`,
					}
				});

				console.log(response);
				const { name, phone, email, role } = response.data;

				setValues(prevState => {
					return {...prevState, name, phone, email, role}
				})
			} catch (err) {
				console.log('err', err);
				if(err.response.status === 401 || err.response.status === 403){
					signout(() => {
						navigate("/signin?sessionExpired=true");
					});
				}
				toast.error(err.response.data.erroMessage);
			}
		};
		getAccountSettings();
	}, []);

	const onChangeHandler = (name) => {
		return (event) => {
			setValues({ ...values, [name]: event.target.value });
		};
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		console.log("values", values);
		const token = getCookie("token");
		const userId = isAuth()._id;
		console.log('userId', userId);
		try{
			const res = await axios({
				method: "PUT",
				url: `http://localhost:5000/user/updateuser/${userId}`,
				data: { name, phone, email, role },
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})

			console.log("res", res);

			setValues((prevState) => {
				return { ...prevState, name, phone, email, role };
			})
			toast.success(res.data.message);
		}catch(error){
			console.log('error', error);
			toast.error(error.response.data.message);
		}
	};

	const updatePageForm = () => (
		<form onSubmit={onSubmitHandler}>
			<div className='form-group'>
				<label className='text-muted'>Role</label>
				<input
					className='form-control'
					defaultValue={role}
					type='text'
					name='role'
					disabled
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					className='form-control'
					value={name}
					type='text'
					name='name'
					onChange={onChangeHandler("name")}
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Phone</label>
				<input
					className='form-control'
					value={phone}
					type='text'
					name='phone'
					onChange={onChangeHandler("phone")}
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					className='form-control'
					value={email}
					type='email'
					name='email'
					onChange={onChangeHandler("email")}
				/>
			</div>
			<div className='form-group'>
				<button className='btn btn-primary' style={{ marginTop: '10px'}}>Submit</button>
			</div>
		</form>
	);
	return (
		<Layout>
			<div className='col-md-6 offset-md-3'>
				<ToastContainer />
				<h1 className='p-5 text-center'>Account Settings</h1>
				{updatePageForm()}
			</div>
		</Layout>
	);
}
