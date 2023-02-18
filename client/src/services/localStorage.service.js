const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_ACCESS = "jwt-expires-access";
const EXPIRES_REFRESH = "jwt-expires-refresh";
const USERID_KEY = "user_local_id";

export function setToken({
	refreshToken,
	accessToken,
	userId,
	accessExpiresIn,
	refreshExpiresIn,
}) {
	const expiresAccess = new Date().getTime() + accessExpiresIn * 1000;
	const expiresRefresh = new Date().getTime() + refreshExpiresIn * 1000;
	localStorage.setItem(USERID_KEY, userId);
	localStorage.setItem(TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_KEY, refreshToken);
	localStorage.setItem(EXPIRES_ACCESS, expiresAccess);
	localStorage.setItem(EXPIRES_REFRESH, expiresRefresh);
}

export function removeToken() {
	localStorage.removeItem(USERID_KEY);
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(REFRESH_KEY);
	localStorage.removeItem(EXPIRES_ACCESS);
}

export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY);
}

export function getExpires() {
	return localStorage.getItem(EXPIRES_ACCESS);
}
export function getExpiresRefresh() {
	return localStorage.getItem(EXPIRES_REFRESH);
}

export function getUserId() {
	return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
	setToken,
	getAccessToken,
	getRefreshToken,
	getExpires,
	getUserId,
	removeToken,
	getExpiresRefresh,
};

export default localStorageService;
