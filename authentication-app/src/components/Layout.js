import React from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../authutils/authUtils";

export const Layout = ({ children }) => {
	// console.log("patth", window.location.pathname);

	const isActive = (path) => {
		let urlPath = window.location.pathname;

		if (path === urlPath) {
			return { color: "black" };
		} else {
			return { color: "white" };
		}
	};

	const userValid = isAuth();
	const signOutUser = (e)	=> {
		e.preventDefault();
		signout(() => {
			window.location.href = "/signin";
		});
	}

	const isAdmin = isAuth() && isAuth().role === "admin";

	const navTab = () => {
		return (
			<ul className='nav nav-tabs bg-primary'>
				<li className='nav-item'>
					<Link className='nav-link' to='/app' style={isActive("/")}>
						App
					</Link>
				</li>
				{isAdmin && (
					<li className='nav-item'>
						<Link
							className='nav-link'
							to='/admin'
							style={isActive("/home")}
						>
							Home
						</Link>
					</li>
				)}
				{!isAdmin && ( <li className='nav-item'>
				<Link
					className='nav-link'
					to='/home'
					style={isActive("/home")}
				>
					Home
				</Link>
			</li> )}
				{!userValid && (
					<>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/signin'
								style={isActive("/signin")}
							>
								Signin
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/signup'
								style={isActive("/signup")}
							>
								Signup
							</Link>
						</li>
					</>
				)}
				{userValid && (
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive("/signout")}
							onClick={signOutUser}
						>
							Signout
						</Link>
					</li>
				)}
			</ul>
		);
	};

	return (
		<>
			{navTab()}
			<div className='container'> {children}</div>
		</>
	);
};

export default Layout;
