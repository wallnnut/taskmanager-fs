const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		title: { type: String },
		description: { type: String },
		completed: { type: Boolean },
		category_size: { type: Schema.Types.ObjectId, ref: "CategorySize" },
		category_sphere: { type: Schema.Types.ObjectId, ref: "CategorySphere" },
		priority: { type: Schema.Types.ObjectId, ref: "Priority" },
		expires_date: { type: String },
		focused_time: { type: Number },
		expires_time: { type: String },
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		time: {type: String}
	},

	{
		timestamps: { createdAt: "created_at" },
	}
);

module.exports = model("Task", schema);
