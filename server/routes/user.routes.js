const express = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User")

const router = express.Router({ mergeParams: true });


router
	.route("/:userId")
	.get(auth, async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send({error:{message: "USER_NOT_FOUND"}})
            }
			return res.send(user);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	})
	.patch(auth, async (req, res) => {
		try {
			const { userId } = req.params;
			const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
				new: true,
			});
			return res.send(updatedUser);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка попробуйте позже",
			});
		}
	});

module.exports = router;
