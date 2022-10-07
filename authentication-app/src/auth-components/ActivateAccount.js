import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from 'jwt-decode'

const ActivateAccount = () => {
	const [values, setValues] = useState({
        name:"",
		token: "",
        buttonText: "Activate Account",
	});
	const {name, token, buttonText} = values;
	
    useEffect(() => {

		let token = window.location.href.split("/")[5];
		const decodedToken = jwt(token);
			if(token){
			setValues({...values,name : decodedToken.name, token:token})
		}	
    }, []);

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, buttonText: "Submitting" });
		console.log("values", values);
		axios({
			method: "POST",
			url: "http://localhost:5000/api/account-activation",
			data: { token },
		})
			.then((response) => {
				console.log("SIGNUP SUCCESS", response);
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("SIGNUP ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};
    const activateAccount = () => (
        <div>
        <h1 className='p-5 text-center' >Hey {name} ready to activate your account</h1>
            <button className='btn btn-primary' onClick={clickSubmit} >{buttonText}</button>
        </div>
    )
	return (
		<Layout>
			<div className='col-md-6 offset-md-3'>
				<ToastContainer />
				{activateAccount()}
			</div>
		</Layout>
	);
};

export default ActivateAccount;
