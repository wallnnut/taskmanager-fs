import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	editTask,
	getLoadingStatusTasks,
	getTaskById,
} from "../../store/slices/tasks";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import moment from "moment";
import { useMod } from "hooks/useMod";
import { Calendar } from "react-calendar";
import { DropDownButton, TextField } from "components";
import { getSpheres } from "store/slices/categorySphere";
import { getSizes } from "store/slices/categorySize";
import { getPriorities } from "store/slices/priority";
import { editTaskSchema } from "./validation/editTaskSchema";

const EditTaskForm = () => {
	const spheres = useSelector(getSpheres());
	const priorities = useSelector(getPriorities());
	const sizes = useSelector(getSizes());
	const isLoading = useSelector(getLoadingStatusTasks());
	const { taskId } = useParams();
	const dispatch = useDispatch();
	const currentTask = useSelector(getTaskById(taskId));
	const [data, setData] = useState({
		...currentTask,
	});

	const [errors, setErrors] = useState({});
	const [value, onChange] = useState(new Date());
	const [isCalendar, setIsCalendar] = useMod(false);
	const [isAlarm, setIsAlarm] = useMod(false);
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
		editTaskSchema
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
		dispatch(editTask(data));
	};

	return (
		<>
			{!isLoading ? (
				<Container className="mt-5">
					<Row>
						<Col md={6} className="offset-md-3 bg-dark rounded-3">
							<h3 className="mt-2">Редактировать</h3>
							<hr />
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
										style={{ position: "relative" }}
										name="calendar"
										onClick={setIsCalendar}
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
									<Button name="alarm" onClick={setIsAlarm}>
										<i className="bi bi-alarm fs-5"></i>
									</Button>

									<DropDownButton
										actions={priorities}
										onChange={handleChange}
										name="priority"
										children={
											<i className="bi bi-flag fs-5"></i>
										}
									/>
									<DropDownButton
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
													setIsCalendar();
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
									Изменить
								</Button>
							</form>
						</Col>
					</Row>
				</Container>
			) : (
				"Loading"
			)}
		</>
	);
};

export default EditTaskForm;
