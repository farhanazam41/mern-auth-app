import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./auth-components/Signup";
import Signin from "./auth-components/Signin";
import ActivateAccount from "./auth-components/ActivateAccount";
import HomePage from "./userpages/HomePage";
import UserProtectedRoute from "./auth-components/ProtectedRoute";
import AdminProtectedRoute from "./auth-components/AdminProtectedRoute";
import FrontPage from "./components/FrontPage";
import Admin from "./adminpages/Admin";

const PageRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<UserProtectedRoute />}>
					<Route path='/home' element={<HomePage />} />
					<Route path='/front' element={<FrontPage />} />
				</Route>
				<Route exact path='/' element={<AdminProtectedRoute />}>
					<Route path='/admin' element={<Admin />} />
				</Route>
				<Route path='/app' element={<App />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='/auth/activate/:token' element={<ActivateAccount />} />
			</Routes>
		</Router>
	);
};

export default PageRoutes;
