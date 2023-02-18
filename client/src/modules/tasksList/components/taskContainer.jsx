import moment from "moment";
import React from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSizeById } from "../../../store/slices/categorySize";
import { getSphereById } from "../../../store/slices/categorySphere";
import { getPriorityById } from "../../../store/slices/priority";
import { CheckBoxField } from "components";

const TaskContainer = ({ task, onRemove, onComplete, listForAllProjects }) => {
	const size = useSelector(getSizeById(task.category_size));
	const sphere = useSelector(getSphereById(task.category_sphere));
	const priority = useSelector(getPriorityById(task.priority));
	const history = useHistory();
	return (
		<Row
			md={4}
			className={`shadow-sm align-items-center  justify-content-sm-between  rounded-4 mb-4 p-4 ${
				task.completed ? "opacity-50 bg-light-subtle" : "bg-body"
			}`}
		>
			<Col lg={1} sm={2} className="d-flex align-items-center my-2">
				{listForAllProjects && (
					<CheckBoxField
						name="completed"
						value={task.completed}
						onChange={onComplete}
						_id={task._id}
						mb="0"
					/>
				)}
				<span>{task.title}</span>
			</Col>
			<Col className="my-2" sm={4}>
				<Badge className="me-2">{sphere.name}</Badge>
				<Badge>{size.name}</Badge>
			</Col>
			<Col className="my-2" sm={4}>
				<Badge bg={priority.color}>{priority.name}</Badge>
			</Col>

			<Col lg={2} sm={2} className="d-flex align-items-center my-2 ">
				{listForAllProjects ? (
					<>
						<Button onClick={() => onRemove(task._id)}>
							<i className="bi bi-trash3 fs-5"></i>
						</Button>
						<Button
							onClick={() =>
								history.push(`projects/${task._id}/edit`)
							}
							className="ms-2 me-4"
						>
							<i className="bi bi-pencil fs-5"></i>
						</Button>
					</>
				) : (
					<span
						style={{ fontFamily: "sans-serif", fontSize: "20px" }}
					>
						{moment(task.focused_time, "ss").format("HH:mm:ss")}
					</span>
				)}
			</Col>
		</Row>
	);
};

export default TaskContainer;
