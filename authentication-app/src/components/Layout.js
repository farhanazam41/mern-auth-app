import React from "react";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
	const navTab = () => {
		return (
			<ul className='nav nav-tabs bg-primary'>
				<li className='nav-item'>
					<Link className='nav-link active' to='/'>
						Home
					</Link>
				</li>
                <li className='nav-item'>
					<Link className='nav-link active' to='/signup'>
						Signup
					</Link>
				</li>
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
