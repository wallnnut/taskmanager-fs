const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const tokenService = require("../services/token.service");

const router = express.Router({ mergeParams: true });
// signUp
// 1. get data from frontend (email, password ...)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens
router.post("/signUp", [
	check("email", "Email введен некорректно").isEmail(),
	check("password", "Пароль должен содержать минимум 8 символов").isLength({
		min: 8,
	}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: {
					message: "INVALID_DATA",
					code: 400,
					errors: errors.array(),
				},
			});
		}
		try {
			const { email, password } = req.body;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({
					error: {
						message: "EMAIL_EXISTS",
					},
				});
			}
			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = await User.create({
				completedTasks: 0,
				...req.body,
				password: hashedPassword,
			});
			const tokens = tokenService.generate({ _id: newUser._id });
			await tokenService.save(newUser._id, tokens.refreshToken);
			res.status(201).send({ ...tokens, userId: newUser._id });
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	},
]);
// 1. Validate input data
// 2. find user
// 3. compare hashed passwords
// 4. generate tokens
// 5. return data
router.post("/signInWithPassword", async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).send({
				error: {
					message: "EMAIL_NOT_FOUND",
					code: 400,
				},
			});
		}
		const isPasswordEqual = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordEqual) {
			return res.status(400).send({
				error: {
					message: "INVALID_PASSWORD",
					code: 400,
				},
			});
		}

		const tokens = tokenService.generate({ _id: existingUser._id });
		await tokenService.save(existingUser._id, tokens.refreshToken);
		return res.status(201).send({ ...tokens, userId: existingUser._id });
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка попробуйте позже",
		});
	}
});

function isTokenInvalid(data, dbToken) {
	return !data || !dbToken || data._id !== dbToken?.user?.toString();
}
router.post("/token", async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body;
		const data = tokenService.validateRefresh(refreshToken);
		const dbToken = await tokenService.findRefreshToken(refreshToken);

		if (isTokenInvalid(data, dbToken)) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const tokens = tokenService.generate({ _id: data._id });
		await tokenService.save(data._id, tokens.refreshToken);
		res.status(201).send({ ...tokens, userId: data._id });
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка попробуйте позже",
		});
	}
});

module.exports = router;
