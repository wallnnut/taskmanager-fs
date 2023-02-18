const express = require("express");
const CategorySize = require("../models/CategorySize");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const list = await CategorySize.find();
		res.status(200).send(list);
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка попробуйте позже",
		});
	}
});

module.exports = router;
