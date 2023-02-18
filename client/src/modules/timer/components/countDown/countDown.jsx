import React from "react";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountDown = ({
	isTaskChoosed,
	isPassedTwoMinutes,
	reset,
	setTimer,
	percentage,
	hours,
	minutes,
	seconds,
	setPaused,
	paused,
	pushFocusedTime,
}) => {
	return (
		<div className="d-flex  align-items-center flex-column mb-4">
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					styles={buildStyles({
						pathColor: "rgb(237, 113, 56)",
						textColor: "rgb(235,235,235)",
					})}
					value={percentage}
					text={`${hours.toString().padStart(2, "0")}:${minutes
						.toString()
						.padStart(2, "0")}:${seconds
						.toString()
						.padStart(2, "0")}`}
				/>
			</div>

			<div className="mt-4 mb-3">
				<Button variant="dark" className="me-2" onClick={setTimer}>
					<i className="bi bi-alarm fs-4"></i>
				</Button>
				<Button
					disabled={isTaskChoosed}
					name="pause"
					variant="dark"
					className="me-2"
					onClick={() => setPaused((prevState) => !prevState)}
				>
					{paused ? (
						<i className="bi bi-play fs-4"></i>
					) : (
						<i className="bi bi-pause fs-4"></i>
					)}
				</Button>
				<Button variant="danger" onClick={() => reset()}>
					<i className="bi bi-stop fs-4"></i>
				</Button>
			</div>
			<Button disabled={isPassedTwoMinutes} onClick={pushFocusedTime}>
				Закончить работу над задачей
			</Button>
		</div>
	);
};

export default CountDown;
