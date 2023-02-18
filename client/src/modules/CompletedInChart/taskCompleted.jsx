import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getTaskList } from "../../store/slices/tasks";

const CompletedTasks = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const allTasks = useSelector(getTaskList());
	const completedTasks = allTasks.filter(
		(task) => task.completed === true
	).length;

	const data = {
		labels: ["Выполненные задачи", "Всего задач"],
		datasets: [
			{
				data: [completedTasks, allTasks.length],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(75, 192, 192, 0.2)",
				],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
				borderWidth: 1,
			},
		],
	};
	return (
		<div
			style={{
				maxHeight: "400px",
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: "20px",
				padding: "10px",
			}}
		>
			<Doughnut data={data} />
		</div>
	);
};

export default CompletedTasks;
