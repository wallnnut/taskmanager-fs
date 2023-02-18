const express = require("express");
const Priority = require("../models/Priority");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const list = await Priority.find();
		res.status(200).send(list);
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка попробуйте позже",
		});
	}
});

module.exports = router;
