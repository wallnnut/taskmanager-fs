import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	getLoadingStatusTasks,
	removeTask,
	editTask,
} from "../../store/slices/tasks";
import Pagination from "./components/pagination";
import TaskContainer from "./components/taskContainer";
import { paginate } from "../../utils/paginate";
import { useMod } from "hooks/useMod";

const TasksList = ({ tasks, listForAllProjects }) => {
	const isLoading = useSelector(getLoadingStatusTasks());
	const dispatch = useDispatch();
	const [, setCreateTaskModal] = useMod(false);

	const [activePage, setActivePage] = useState(1);
	const handleRemoveTask = (taskId) => {
		dispatch(removeTask(taskId));
	};
	const handleComplete = (data) => {
		dispatch(editTask(data));
	};
	const windowInnerHeight = window.innerHeight;
	const pageSize = windowInnerHeight === 1080 ? 6 : 3;
	const handlePageChange = (pageIndex) => {
		setActivePage(pageIndex);
	};
	const taskCrop = paginate(tasks, activePage, pageSize);
	if (tasks.length === 0) return null;
	return (
		<>
			{!isLoading ? (
				<Container fluid="md" className="mt-5 ">
					{taskCrop.map((task) => (
						<TaskContainer
							listForAllProjects={listForAllProjects}
							key={task._id}
							onComplete={handleComplete}
							onRemove={handleRemoveTask}
							task={task}
						/>
					))}
					<div className="d-flex justify-content-center ">
						<Pagination
							activePage={activePage}
							itemsCount={tasks.length}
							pageSize={pageSize}
							onPageChange={handlePageChange}
						/>
					</div>
				</Container>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default TasksList;
