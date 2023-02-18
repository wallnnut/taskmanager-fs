import DataLoader from "hoc/dataLoader";
import React from "react";
import { useSelector } from "react-redux";
import { getCompletedTasks } from "store/slices/tasks";
import TasksList from "../modules/tasksList/tasksList";

const CompletedList = () => {
	const tasks = useSelector(getCompletedTasks());
	return (
		<DataLoader>
			<TasksList tasks={tasks} listForAllProjects={true} />
		</DataLoader>
	);
};

export default CompletedList;
