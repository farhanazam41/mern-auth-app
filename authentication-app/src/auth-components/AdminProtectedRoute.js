import React, { Component } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../authutils/authUtils";

const UserProtectedRoute = (props) => {
    const validUser = isAuth();
console.log("validUser", validUser);
    const admin = validUser && validUser.role === 'admin';
	return admin ? <Outlet {...props}/> : <Navigate to="/signin?sessionExpired=true" />;
};

export default UserProtectedRoute;
