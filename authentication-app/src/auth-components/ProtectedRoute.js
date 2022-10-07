import React, { Component } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../authutils/authUtils";

const ProtectedRoute = (props) => {
    
	return isAuth() ? <Outlet {...props}/> : <Navigate to="/signin?sessionExpired=true" />;
};

export default ProtectedRoute;
