import httpService from "./http.service";

const priorityEndPoint = "priority/";
const priorityService = {
	get: async () => {
		const { data } = await httpService.get(priorityEndPoint);
		return data;
	},
};

export default priorityService;
