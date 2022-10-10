import React, { Component } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../authutils/authUtils";

const UserProtectedRoute = (props) => {
    const validUser = isAuth();

	return validUser ? <Outlet {...props}/> : <Navigate to="/signin?sessionExpired=true" />;
};

export default UserProtectedRoute;
