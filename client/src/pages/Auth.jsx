import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoginForm from "../modules/loginForm/LoginForm";
import RegisterForm from "../modules/registerForm/registerForm";
const Auth = () => {
	const { type } = useParams();
	const [formType, setFormType] = useState(
		type === "register" ? type : "login"
	);
	const toggleFormType = () => {
		setFormType((prevState) =>
			prevState === "register" ? "login" : "register"
		);
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow bg-dark rounded-3 p-4 mb-4">
					{formType === "register" ? (
						<>
							<h3 className=" text-center mb-4">Регистрация</h3>
							<RegisterForm />
						</>
					) : (
						<>
							<h3 className="text-center mb-4">Войти</h3>
							<LoginForm />
						</>
					)}
				</div>
				<Col
					md={6}
					className="offset-md-3 shadow bg-dark rounded-3 p-4 d-flex justify-content-center align-items-center"
				>
					{formType === "register" ? (
						<div>
							<p>
								Уже есть аккаунт?
								<a
									style={{
										color: "#5898c3",
										textDecoration: "underline",
									}}
									role="button"
									onClick={toggleFormType}
								>
									Войти
								</a>
							</p>
						</div>
					) : (
						<div>
							<p>
								Нет аккаунта?
								<a
									style={{
										color: "#5898c3",
										textDecoration: "underline",
									}}
									role="button"
									onClick={toggleFormType}
								>
									Зарегестрироваться
								</a>
							</p>
						</div>
					)}
				</Col>
			</div>
		</div>
	);
};

export default Auth;

