import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedInStatus } from "../store/slices/user";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
	const isLoggedIn = useSelector(getLoggedInStatus());
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isLoggedIn) {
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
				return Component ? <Component {...props} /> : children;
			}}
		/>
	);
};

export default ProtectedRoute;
