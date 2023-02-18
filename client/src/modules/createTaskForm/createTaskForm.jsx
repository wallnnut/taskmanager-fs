import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Calendar } from "react-calendar";
import "./calendar.css";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/slices/tasks";
import { TextField, DropDownButton } from "components";
import { createTaskSchema } from "./validation/createTaskSchema";
import { useEffect } from "react";
import { useMod } from "hooks/useMod";
import { Modal } from "react-bootstrap";
import { getSizes } from "store/slices/categorySize";
import { getSpheres } from "store/slices/categorySphere";
import { getPriorities } from "store/slices/priority";
const CreateTaskForm = () => {
	const dispatch = useDispatch();
	const spheres = useSelector(getSpheres());
	const sizes = useSelector(getSizes());
	const priorities = useSelector(getPriorities());
	const [createTaskModal, setCreateTaskModal] = useMod(false);

	const [data, setData] = useState({
		title: "",
		description: "",
		expires_date: "",
		priority: "",
		category_sphere: "",
		category_size: "",
		time: moment().format("x"),
		completed: false,
		focused_time: 0,
	});
	useEffect(() => {
		setIsAlarm(false);
		setIsCalendar(false);
		setData({
			title: "",
			description: "",
			expires_date: "",
			priority: "",
			category_sphere: "",
			category_size: "",
			time: moment().format("x"),
			completed: false,
			focused_time: 0,
		});
	}, [createTaskModal]);
	const [errors, setErrors] = useState({});
	const [value, onChange] = useState(new Date());
	const [isCalendar, setIsCalendar] = useState(false);
	const [isAlarm, setIsAlarm] = useState(false);

	const handleChange = (target) => {
		if (target.name === "time") {
			setData((prevState) => ({
				...prevState,
				[target.name]: moment(target.value, "HH:mm").format("x"),
			}));
		} else {
			setData((prevState) => ({
				...prevState,
				[target.name]: target.value,
			}));
		}
	};
	useEffect(() => {
		validate();
	}, [data]);
	const validate = () => {
		createTaskSchema
			.validate(data, { abortEarly: false })
			.then(() => {
				setErrors({});
			})
			.catch((e) => {
				const { inner } = e;

				const errors = Array.isArray(inner)
					? inner.reduce((acc, item) => {
							const { path, errors } = item;
							if (!acc.hasOwnProperty(path) && errors.length) {
								acc[path] = errors[0];
							}
							return acc;
					  }, {})
					: {};
				setErrors(errors);
			});

		return Object.keys(errors).length === 0;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createTask(data));
		setCreateTaskModal();
	};

	return (
		<>
			<Container className="mt-4 d-flex justify-content-between  ">
				<h2>Все проекты</h2>
				<Button
					onClick={setCreateTaskModal}
					className="d-flex align-items-center"
					variant="warning"
				>
					<span className="fs-5">Создать</span>
					<i className="bi bi-plus fs-3"></i>
				</Button>
			</Container>
			<Modal
				contentClassName="bg-dark"
				show={createTaskModal}
				onHide={setCreateTaskModal}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton closeVariant="white">
					<h3 className=" text-lg text-center text-light">
						Создать задачу
					</h3>
				</Modal.Header>
				<Container>
					<Row>
						<Col>
							<form onSubmit={handleSubmit}>
								<TextField
									label="Название задачи"
									name="title"
									value={data.title}
									onChange={handleChange}
									error={errors.title}
								/>
								<TextField
									label="Описание задачи"
									name="description"
									value={data.description}
									onChange={handleChange}
									error={errors.description}
								/>
								<Stack
									className="d-flex mb-5 mx-auto"
									direction="horizontal"
									gap={2}
								>
									<Button
										variant="success"
										style={{ position: "relative" }}
										name="calendar"
										onClick={() =>
											setIsCalendar(
												(prevState) => !prevState
											)
										}
									>
										<i className="bi bi-calendar fs-5"></i>
										{data.expires_date !== "" && (
											<span
												style={{
													position: "absolute",
													top: "30%",
													fontSize: "13px",
													left: "33.5%",
												}}
											>
												{moment(
													data.expires_date,
													"x"
												).format("DD")}
											</span>
										)}
									</Button>
									<Button
										variant="success"
										name="alarm"
										onClick={() =>
											setIsAlarm(
												(prevState) => !prevState
											)
										}
									>
										<i className="bi bi-alarm fs-5"></i>
									</Button>

									<DropDownButton
										variant="success"
										actions={priorities}
										onChange={handleChange}
										name="priority"
										children={
											<>
												{errors.priority && (
													<i className="bi bi-exclamation-circle text-warning mx-2"></i>
												)}
												<i className="bi bi-flag fs-5"></i>
											</>
										}
									/>
									<DropDownButton
										variant="success"
										actions={spheres}
										onChange={handleChange}
										name="category_sphere"
										children={
											<>
												{errors.category_sphere && (
													<i className="bi bi-exclamation-circle text-warning mx-2"></i>
												)}
												<i className="bi bi-tag fs-5"></i>
											</>
										}
									/>
									<DropDownButton
										variant="success"
										actions={sizes}
										onChange={handleChange}
										name="category_size"
										children={
											<>
												{errors.category_size && (
													<i className="bi bi-exclamation-circle text-warning mx-2"></i>
												)}
												<i className="bi bi-rulers fs-5"></i>
											</>
										}
									/>
								</Stack>
								<Stack className="mb-5">
									{isCalendar && (
										<Stack className="mx-auto mb-5">
											<label className="text-light">
												Выбирите дату
											</label>
											<Calendar
												onClickDay={(value) => {
													setData((prevState) => ({
														...prevState,
														expires_date:
															moment(
																value
															).format("x"),
													}));
													setIsCalendar(
														(prevState) =>
															!prevState
													);
												}}
												onChange={onChange}
												value={value}
											/>
										</Stack>
									)}
									{isAlarm && (
										<TextField
											name="time"
											value={data.time}
											onChange={handleChange}
											error={errors.time}
											label="Установите время"
											type="time"
										/>
									)}
								</Stack>
								<Button
									disabled={Object.keys(errors).length !== 0}
									className=" bg-primary-subtle w-100 mb-3"
									type="submit"
								>
									Создать
								</Button>
							</form>
						</Col>
					</Row>
				</Container>
			</Modal>
		</>
	);
};

export default CreateTaskForm;
