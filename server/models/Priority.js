const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: { type: String },
		color: {type: String}
	},
	{
		timestamps: { createdAt: "created_at" },
	}
);

module.exports = model("Priority", schema);
