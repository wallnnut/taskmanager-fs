import httpService from "./http.service";

const sphereEndPoint = "categorySphere/";
const categorySphereService = {
	get: async () => {
		const { data } = await httpService.get(sphereEndPoint);
		return data;
	},
};

export default categorySphereService;
