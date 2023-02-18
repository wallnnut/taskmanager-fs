import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthErrors, signIn } from "../../store/slices/user";
import { CheckBoxField, TextField } from "components";

const LoginForm = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const loginErrors = useSelector(getAuthErrors());
	const [data, setData] = useState({
		email: "",
		password: "",
		stayOn: false,
	});

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const { email, password } = data;
		dispatch(signIn({ email, password }));
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
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>

			<CheckBoxField
				value={data.stayOn}
				onChange={handleChange}
				name="stayOn"
			>
				Оставаться в системе
			</CheckBoxField>
			{loginErrors && <p className="text-danger">{loginErrors}</p>}
			<Button className="bg-primary-subtle w-100 mx-auto" type="submit">
				Войти
			</Button>
		</form>
	);
};

export default LoginForm;
