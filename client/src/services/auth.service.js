import axios from "axios";
import httpService from "./http.service";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
	baseURL: config.apiEndPoint + "auth/",
	// params: {
	// 	key: process.env.REACT_APP_FIREBASE_KEY,
	// },
});
const userEndPoint = "user/";

const authService = {
	register: async (payload) => {
		const { data } = await httpAuth.post("signUp", payload);
		return data;
	},
	login: async ({ email, password }) => {
		const { data } = await httpAuth.post("signInWithPassword", {
			email,
			password,
		});
		return data;
	},
	refresh: async () => {
		try {
			const { data } = await httpAuth.post("token", {
				refresh_token: localStorageService.getRefreshToken(),
			});
			return data;
		} catch (e) {
			console.log(e.response.data.message);
		}
		
	},

	edit: async (payload) => {
		const { data } = await httpService.edit(
			userEndPoint + localStorageService.getUserId(),
			payload
		);

		return data;
	},

	getCurrentUser: async () => {
		const { data } = await httpService.get(
			userEndPoint + localStorageService.getUserId()
		);
		return data;
	},
};

export default authService;
