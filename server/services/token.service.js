const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const config = require("config");

const tokenService = {
	generate(payload) {
		const accessToken = jwt.sign(payload, config.get("accessKey"), {
			expiresIn: '1h',
		});
		const refreshToken = jwt.sign(payload, config.get("refreshKey"), {
			expiresIn: "2h",
		});
		return {
			accessToken,
			refreshToken,
			accessExpiresIn: 3600,
			refreshExpiresIn: 7200,
		};
	},
	async save(userId, refreshToken) {
		const data = await Token.findOne({ user: userId });
		if (data) {
			data.refreshToken = refreshToken;
			return data.save();
		}
		const token = await Token.create({ user: userId, refreshToken });
		return token;
	},
	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, config.get("refreshKey"));
		} catch (error) {
			return null;
		}
	},
	async findRefreshToken(refreshToken) {
		try {
			return await Token.findOne({ refreshToken });
		} catch (error) {
			return null;
		}
	},
	  validateAccess(accessToken) {
		try {
			return jwt.verify(accessToken, config.get("accessKey"));
		} catch (error) {
			return null;
		}
	},
};

module.exports = tokenService;
