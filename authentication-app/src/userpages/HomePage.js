import React from 'react'
import { useEffect } from "react";
import Layout from "../components/Layout";
import { isAuth } from "../authutils/authUtils";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
	const userCookieExists = isAuth();
	// useEffect(() => {
	// 	if(!userCookieExists){
	// 		navigate("/signin?sessionExpired=true");
	// 	}
	// },[navigate, userCookieExists])

  return (
    <Layout>This is Home Page</Layout>
  )
}
