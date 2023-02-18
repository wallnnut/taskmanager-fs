import { createAction, createSlice } from "@reduxjs/toolkit";
import { authErrorGenerator } from "utils/errorGenerator";
import { history } from "utils/history";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";



const isRefreshExpired =
	localStorageService.getExpiresRefresh() < Date.now().toString();
const initialState =
	localStorageService.getAccessToken() && !isRefreshExpired
		? {
				user: null,
				error: null,
				isLoggedIn: true,
		  }
		: {
				user: null,
				error: null,
				isLoggedIn: false,
		  };

const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		authRequestSuccess: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload;
		},

		userLoggedOut: (state) => {
			state.user = null;
			state.error = null;
			state.isLoggedIn = false;
		},
		userEdited: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},
		editRequestFailed: (state, action) => {
			state.error = action.payload;
		},
		authRequested: (state) => {
			state.error = null;
		},
	},
});
const editRequested = createAction("users/editRequested");
const { reducer: usersReducer, actions } = usersSlice;
const {
	authRequestSuccess,
	authRequestFailed,
	userLoggedOut,
	userEdited,
	editRequestFailed,
	authRequested,
} = actions;
export const signUp = (payload) => async (dispatch) => {
	dispatch(authRequested());
	try {
		const data = await authService.register(payload);
		localStorageService.setToken(data);
		await dispatch(receiveUserData());
		history.push("/");
	} catch (error) {
		const { message } = error.response.data.error;
		if (error.response.status === 400) {
			const errorMessage = authErrorGenerator(message);
			dispatch(authRequestFailed(errorMessage));
		} else {
			dispatch(authRequestFailed(error.message));
		}
	}
};

export const signIn =
	({ email, password }) =>
	async (dispatch) => {
		dispatch(authRequested());
		try {
			const data = await authService.login({ email, password });
			localStorageService.setToken(data);
			await dispatch(receiveUserData());
			history.push("/");
		} catch (error) {
			const { message } = error.response.data.error;
			if (error.response.status === 400) {
				const errorMessage = authErrorGenerator(message);
				dispatch(authRequestFailed(errorMessage));
			} else {
				dispatch(authRequestFailed(error.message));
			}
		}
	};
export const receiveUserData = () => async (dispatch) => {
	try {
		const { content } = await authService.getCurrentUser();
		dispatch(authRequestSuccess(content));
	} catch (error) {
		dispatch(authRequestFailed(error.message));
	}
};
export const editUserData = (payload) => async (dispatch) => {
	dispatch(editRequested());
	try {
		const { content } = await authService.edit(payload);
		dispatch(userEdited(content));
		history.push("/projects");
	} catch (error) {
		dispatch(editRequestFailed(error.message));
	}
};

export const logOut = () => (dispatch) => {
	localStorageService.removeToken();
	dispatch(userLoggedOut());
	history.push("/login");
};



export const getLoggedInStatus = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserData = () => (state) =>
	state.user.user ? state.user.user : null;
export const getAuthErrors = () => (state) => state.user.error;


export default usersReducer;
