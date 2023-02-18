import React, { useState } from "react";

import TasksList from "../modules/tasksList/tasksList";
import CreateTaskForm from "../modules/createTaskForm/createTaskForm";
import { useParams } from "react-router-dom";
import EditTaskPage from "./editTaskPage";
import DataLoader from "../hoc/dataLoader";
import { useSelector } from "react-redux";
import { getIncompletedTasks } from "store/slices/tasks";
import Filters from "modules/filterModalForm/filters";
const AllProjects = () => {
	const { taskId } = useParams();
	const tasks = useSelector(getIncompletedTasks());
	const [filter, setFilter] = useState({});
	const onSelect = (choosenCategory) => {
		setFilter(choosenCategory);
	};

	const filterTasks = (tasksList) => {
		const filteredTasks = filter.sphere
			? tasksList.filter((task) => task.category_sphere === filter.sphere)
			: filter.size
			? tasksList.filter((task) => task.category_size === filter.size)
			: filter.priority
			? tasksList.filter((task) => task.priority === filter.priority)
			: tasksList;
		return filteredTasks;
	};

	const filteredTasks = filterTasks(tasks);
	return (
		<DataLoader>
			{taskId ? (
				<EditTaskPage />
			) : (
				<>
					<CreateTaskForm />
					<Filters onSelect={onSelect} />
					<TasksList
						tasks={filteredTasks}
						listForAllProjects={true}
					/>
				</>
			)}
		</DataLoader>
	);
};

export default AllProjects;
