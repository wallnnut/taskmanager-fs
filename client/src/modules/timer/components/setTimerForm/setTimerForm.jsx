import React, { useState, useEffect } from "react";
import { timerSchema } from "./validators/timerSchema";
import { Button } from "react-bootstrap";
import { TextField } from "components";

const SetTimerForm = ({ onSubmit, setTimerModal }) => {
	const [time, setTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [errors, setErrors] = useState({});

	const handleChange = (target) => {
		setTime((prevState) => ({
			...prevState,
			[target.name]: Number(target.value),
		}));
	};
	const isValid = Object.keys(errors).length === 0;
	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
		onSubmit(time);
	};

	useEffect(() => {
		validate();
	}, [time]);
	const validate = () => {
		timerSchema
			.validate(time)
			.then(() => {
				setErrors({});
			})
			.catch((e) => setErrors({ [e.path]: e.message }));
		return Object.keys(errors).length === 0;
	};
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				type="text"
				onChange={handleChange}
				value={time.hours}
				label="Часы"
				name="hours"
				error={errors.hours}
			/>
			<TextField
				type="text"
				onChange={handleChange}
				value={time.minutes}
				label="Минуты"
				name="minutes"
				error={errors.minutes}
			/>
			<TextField
				type="text"
				onChange={handleChange}
				value={time.seconds}
				label="Секунды"
				name="seconds"
				error={errors.seconds}
			/>
			<Button
				disabled={!isValid}
				variant="warning"
				className="w-100"
				type="submit"
			>
				Установить
			</Button>
		</form>
	);
};

export default SetTimerForm;
