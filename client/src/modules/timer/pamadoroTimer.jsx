import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetTimerForm from "./components/setTimerForm/setTimerForm";
import ModalWindow from "../../hoc/ModalWindow";
import {
	editTask,
	getIncompletedTasks,
	getTaskList,
} from "../../store/slices/tasks";
import CountDown from "./components/countDown/countDown";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { SelectField } from "components";
import { useMod } from "hooks/useMod";
import DataLoader from "hoc/dataLoader";

const PamadoroTimer = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		tasks: "",
	});

	const [timerModal, setTimerModal] = useMod(false);
	const tasks = useSelector(getIncompletedTasks());
	const taskList = tasks
		? tasks.map((task) => ({
				value: task._id,
				label: task.title,
		  }))
		: [];

	const [[hours, minutes, seconds], setTime] = useState([0, 0, 0]);
	const [totalSeconds, setTotalSeconds] = useState();

	const [paused, setPaused] = useState(true);
	const [over, setOver] = useState(false);

	const handleSubmit = (data) => {
		setTime(Object.values(data));
		setTotalSeconds(
			parseInt(data.hours) * 3600 +
				parseInt(data.minutes) * 60 +
				parseInt(data.seconds)
		);
		setTimerModal();
	};

	const tick = () => {
		if (paused || over) {
			return;
		}
		if (hours === 0 && minutes === 0 && seconds === 0) {
			if (data.tasks) {
				pushFocusedTime();
			}
			setOver(true);
		} else if (minutes === 0 && seconds === 0) {
			setTime([hours - 1, 59, 59]);
		} else if (seconds === 0) {
			setTime([hours, minutes - 1, 59]);
		} else {
			setTime([hours, minutes, seconds - 1]);
		}
	};

	useEffect(() => {
		setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
	}, [hours, minutes, seconds]);
	const reset = () => {
		setTime([0, 0, 0]);
		setOver(false);
		setPaused(true);
	};
	over && reset();

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});
	const secondsLeft = [hours, minutes, seconds].reduce(
		(acc, value, index) => {
			if (index === 0) {
				return acc + value * 3600;
			}
			if (index === 1) {
				return acc + value * 60;
			}
			return acc + value;
		},
		0
	);

	const percentage = Math.round((secondsLeft / totalSeconds) * 100);
	const pushFocusedTime = () => {
		setPaused(true);
		setTime([0, 0, 0]);
		const currentTask = tasks.find((task) => task._id === data.tasks);
		toast.success("Вы завершили задачу");
		dispatch(
			editTask({
				_id: data.tasks,
				focused_time:
					totalSeconds - secondsLeft + currentTask.focused_time,
			})
		);
	};

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const isPassedTwoMinutes = totalSeconds - secondsLeft > 120 ? false : true;
	const isTaskChoosed = data.tasks === "" ? true : false;

	return (
		<DataLoader>
			<div className="row">
				<div className="col-md-6 offset-md-3 p-4">
					<CountDown
						isPassedTwoMinutes={isPassedTwoMinutes}
						isTaskChoosed={isTaskChoosed}
						percentage={percentage}
						hours={hours}
						minutes={minutes}
						seconds={seconds}
						reset={reset}
						setPaused={setPaused}
						paused={paused}
						setTimer={setTimerModal}
						pushFocusedTime={pushFocusedTime}
					/>
					<ModalWindow
						modalHeader="Установить таймер"
						modalBody={<SetTimerForm onSubmit={handleSubmit} />}
						modalButton="Установить"
						show={timerModal}
						handleClose={setTimerModal}
					/>
					<SelectField
						label="Выбери задачу"
						defaultOption="Выберите задачу"
						options={taskList}
						name="tasks"
						onChange={handleChange}
						value={data.tasks}
					/>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Добавьте описание</Form.Label>
							<Form.Control
								style={{ backgroundColor: "#2b3035" }}
								as="textarea"
								rows={3}
							/>
						</Form.Group>
					</Form>
				</div>
			</div>
		</DataLoader>
	);
};

export default PamadoroTimer;
