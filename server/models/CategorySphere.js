const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		name: { type: String },
	},
	{
		timestamps: { createdAt: "created_at" },
	}
);

module.exports = model("CategorySphere", schema);
