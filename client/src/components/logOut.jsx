import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../store/slices/user";
const LogOut = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(logOut());
		history.push("/");
	}, []);
	return <h1>Loading...</h1>;
};

export default LogOut;
