import axios from "axios";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
	baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
	async function (config) {
		const expiresDate = localStorageService.getExpires();
		const refreshToken = localStorageService.getRefreshToken();
		const isExpired = refreshToken && expiresDate < Date.now().toString();
		const accessToken = localStorageService.getAccessToken();

		if (configFile.isFireBase) {
			const containSlash = / \/$ /gi.test(config.url);
			config.url =
				(containSlash
					? (config.url = config.url.slice(0, -1))
					: config.url) + ".json";

			if (isExpired) {
				const { data } = await axios.post(
					`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
					{
						grant_type: "refresh_token",
						refresh_token: refreshToken,
					}
				);
				localStorageService.setToken({
					refreshToken: data.refresh_token,
					idToken: data.id_token,
					expiresIn: data.expires_in,
					localId: data.user_id,
				});
			}
			if (accessToken) {
				config.params = { ...config.params, auth: accessToken };
			}
		} else {
			if (isExpired) {
				const data = await authService.refresh();
				localStorageService.setToken(data);
			}
			if (accessToken) {
				const newAccessToken = localStorageService.getAccessToken();
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${newAccessToken}`,
				};
			}
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

function transformData(data) {
	return data && !data._id
		? Object.keys(data).map((key) => ({ ...data[key] }))
		: data;
}

http.interceptors.response.use(
	(res) => {
		if (configFile.isFireBase) {
			res.data = { content: transformData(res.data) };
		}
		res.data = { content: res.data };
		return res;
	},
	function (error) {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;
		if (!expectedErrors) {
			// toast.error("Something went wrong. Try later");
		}
		return Promise.reject(error);
	}
);

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	edit: http.patch,
};

export default httpService;
