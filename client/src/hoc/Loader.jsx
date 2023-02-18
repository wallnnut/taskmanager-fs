import React, { useEffect } from "react";
import { getLoadingStatusTasks } from "../store/slices/tasks";

import { useDispatch, useSelector } from "react-redux";
import {
	getAuthErrors,
	getLoggedInStatus,
	receiveUserData,
} from "../store/slices/user";
// import Spinner from "react-bootstrap/Spinner";
import RegisterLogin from "pages/Auth";
import { Redirect } from "react-router-dom";

const Loader = ({ children }) => {
	const dispatch = useDispatch();
	const loggedInStatus = useSelector(getLoggedInStatus());
	const authErrors = useSelector(getAuthErrors());
	const tasksIsLoaded = useSelector(getLoadingStatusTasks());

	useEffect(() => {
		if (loggedInStatus) {
			dispatch(receiveUserData());
		}
	}, [loggedInStatus]);
	// if (authErrors === "Unauthorized") {
	// 	localStorage.clear();
	// 	return <Redirect to="/login" />;
	// }
	return <>{loggedInStatus ? children : <RegisterLogin />}</>;
};

export default Loader;
