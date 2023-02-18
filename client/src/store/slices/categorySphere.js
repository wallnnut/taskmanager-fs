import { createSlice } from "@reduxjs/toolkit";
import categorySphereService from "../../services/categorySphere.service";

const categorySphereSlice = createSlice({
	name: "categorySphere",
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		dataLoaded: false,
	},
	reducers: {
		categorySphereRequested: (state) => {
			state.isLoading = true;
		},
		categorySphereReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.dataLoaded = true;
		},
		categorySphereRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: categorySphereReducer, actions } = categorySphereSlice;
const {
	categorySphereRequested,
	categorySphereReceived,
	categorySphereRequestFailed,
} = actions;

export const loadCategorySphere = () => async (dispatch) => {
	dispatch(categorySphereRequested());
	try {
		const { content } = await categorySphereService.get();
		dispatch(categorySphereReceived(content));
	} catch (error) {
		dispatch(categorySphereRequestFailed());
	}
};

export const getSpheres = () => (state) => state.sphere.entities;
export const getSphereById = (sphereId) => (state) =>
	state.sphere.entities.find((sph) => sph._id === sphereId);
export const getLoadingStatusSphere = () => (state) => state.sphere.isLoading;
export const getSphereExistStatus = () => (state) => state.sphere.dataLoaded;


export default categorySphereReducer;
