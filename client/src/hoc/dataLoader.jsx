import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSizeExistStatus,
	loadCategorySizes,
} from "../store/slices/categorySize";
import {
	getSphereExistStatus,
	loadCategorySphere,
} from "../store/slices/categorySphere";
import {
	getPriorityExistStatus,
	loadPriorities,
} from "../store/slices/priority";
import {
	getTaskErrors,
	getTasksExistStatus,
	loadTaskList,
} from "../store/slices/tasks";
import { getLoggedInStatus } from "../store/slices/user";
import CustomSpinner from "components/customSpinner";
import { Redirect } from "react-router-dom";
import localStorageService from "services/localStorage.service";

const DataLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(getLoggedInStatus());
	const tasks = useSelector(getTasksExistStatus());
	const size = useSelector(getSizeExistStatus());
	const sphere = useSelector(getSphereExistStatus());
	const priority = useSelector(getPriorityExistStatus());
	const taskErrors = useSelector(getTaskErrors());
	const dataLoadedStatus = tasks && size && sphere && priority;
	useEffect(() => {
		if (isLoggedIn) {
			if (!size) dispatch(loadCategorySizes());
			if (!sphere) dispatch(loadCategorySphere());
			if (!priority) dispatch(loadPriorities());
			if (!tasks) dispatch(loadTaskList());
		}
	}, []);
	// if (taskErrors === "Unauthorized") {
	// 	localStorage.clear();
	// 	return <Redirect to="/login" />;
	// }
	return <div>{dataLoadedStatus ? children : <CustomSpinner />}</div>;
};

export default DataLoader;
