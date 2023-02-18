const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(auth, async (req, res) => {
		try {
			const list = await Task.find({ userId: req.user._id });
			res.status(201).send(list);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	})
	.post(auth, async (req, res) => {
		try {
			const newTask = await Task.create({
				...req.body,
				userId: req.user._id,
			});
			res.status(201).send(newTask);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	});

router
	.route("/:taskId")
	.delete(auth, async (req, res) => {
		try {
			const { taskId } = req.params;
			const taskToRemove = await Task.findById(taskId);
			await taskToRemove.remove();
			return res.send(taskToRemove);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	})
	.patch(auth, async (req, res) => {
		try {
			const { taskId } = req.params;
			const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
				new: true,
			});
			return res.send(updatedTask);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	});

module.exports = router;
