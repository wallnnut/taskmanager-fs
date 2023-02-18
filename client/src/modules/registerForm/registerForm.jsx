import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthErrors, signUp } from "../../store/slices/user";
import { registerSchema } from "./validators/registerSchema";
import { CheckBoxField, RadioField, TextField } from "components";
import { authErrorGenerator } from "utils/errorGenerator";

const RegisterForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const registerErrors = useSelector(getAuthErrors());
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({
		email: "",
		password: "",
		birthDate: moment().valueOf(),
		name: "",
		sex: "male",
		license: false,
	});
	const options = [
		{ name: "Male", value: "male" },
		{ name: "Female", value: "female" },
		{ name: "Other", value: "other" },
	];

	const handleChange = (target) => {
		if (target.name === "birthDate") {
			setData((prevState) => ({
				...prevState,
				[target.name]: moment(target.value, "yyyy-MM-DD").format("x"),
			}));
		} else {
			setData((prevState) => ({
				...prevState,
				[target.name]: target.value,
			}));
		}
	};
	const isValid = Object.keys(errors).length === 0;
	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
		dispatch(signUp(data));
		history.push("/");
	};

	useEffect(() => {
		validate();
	}, [data]);
	const validate = () => {
		registerSchema
			.validate(data)
			.then(() => {
				setErrors({});
			})
			.catch((e) => setErrors({ [e.path]: e.message }));
		return Object.keys(errors).length === 0;
	};
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label="Имя"
				name="name"
				value={data.name}
				onChange={handleChange}
				error={errors.name}
			/>
			<TextField
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>
			<TextField
				label="Дата рождения"
				type="date"
				name="birthDate"
				value={data.birthDate}
				onChange={handleChange}
				error={errors.birthDate}
			/>
			<RadioField
				options={options}
				value={data.sex}
				name="sex"
				onChange={handleChange}
				label="Выберите ваш пол"
			/>
			<CheckBoxField
				value={data.license}
				onChange={handleChange}
				name="license"
				error={errors.license}
			>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>
			{registerErrors && <p className="text-danger">{registerErrors}</p>}
			<Button
				className=" bg-primary-subtle w-100 mx-auto"
				type="submit"
				disabled={!isValid}
			>
				Submit
			</Button>
		</form>
	);
};

export default RegisterForm;
