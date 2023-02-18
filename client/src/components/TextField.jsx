import moment from "moment";
import React, { useState } from "react";

const TextField = ({ label, type, name, value, onChange, error }) => {
	const [showPassword, setShowPassword] = useState(false);
	const valueTransformedToHoursAndMinutes = moment(value, "x").format(
		"HH:mm"
	);
	const valueTransformedToYYYYMMDD = moment(value, "x").format("yyyy-MM-DD");

	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	const getInputClasses = () => {
		return "form-control bg-body-tertiary" + (error ? " is-invalid" : "");
	};
	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};
	return (
		<div className="mb-4">
			<label className="text-light" htmlFor={name}>
				{label}
			</label>

			<div className="input-group has-validation">
				<input
					type={showPassword ? "text" : type}
					id={name}
					name={name}
					value={
						type === "time"
							? valueTransformedToHoursAndMinutes
							: type === "date"
							? valueTransformedToYYYYMMDD
							: value
					}
					onChange={handleChange}
					className={getInputClasses()}
				/>
				{type === "password" && (
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={toggleShowPassword}
					>
						<i
							className={
								"bi bi-eye" + (showPassword ? "-slash" : "")
							}
						></i>
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

export default TextField;
