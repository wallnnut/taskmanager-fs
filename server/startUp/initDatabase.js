const CategorySize = require("../models/CategorySize");
const CategorySphere = require("../models/CategorySphere");
const Priority = require("../models/Priority");

const categorySizeMock = require("../mock/categorySize.json");
const categorySphereMock = require("../mock/categorySphere.json");
const priorityMock = require("../mock/priority.json");

module.exports = async () => {
	const categorySizeList = await CategorySize.find();
	if (categorySizeList.length !== categorySizeMock.length) {
		await createInitialEntity(CategorySize, categorySizeMock);
	}
	const categorySphereList = await CategorySphere.find();
	if (categorySphereList.length !== categorySphereMock.length) {
		await createInitialEntity(CategorySphere, categorySphereMock);
	}
	const priorityList = await Priority.find();
	if (priorityList.length !== priorityMock.length) {
		await createInitialEntity(Priority, priorityMock);
	}
};

async function createInitialEntity(Model, data) {
	await Model.collection.drop();
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id;
				const newItem = new Model(item);
				await newItem.save();
				return newItem;
			} catch (error) {
				return error;
			}
		})
	);
}
