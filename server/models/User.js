const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: {
			type: String,
			// required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		completedTasks: {
			type: Number,
			required: true,
		},
		birthDate: {
			type: String,
			// required: true,
		},
		license: {
			type: Boolean,
			// required: true,
		},
		sex: { type: String, enum: ["male", "female", "other"] },

		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", schema);
