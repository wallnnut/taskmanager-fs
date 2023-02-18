import httpService from "./http.service";

const taskEndPoint = "task/";

const taskService = {
	get: async () => {
		const { data } = await httpService.get(taskEndPoint);
		return data;
	},
	create: async (payload) => {
		const { data } = await httpService.post(taskEndPoint, payload);
		return data;
	},
	remove: async (taskId) => {
		const { data } = await httpService.delete(taskEndPoint + taskId);
		return data;
	},
	edit: async (payload) => {
		const { data } = await httpService.edit(
			taskEndPoint + payload._id,
			payload
		);
		return data;
	},
};

export default taskService;
