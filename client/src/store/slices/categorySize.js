import { createSlice } from "@reduxjs/toolkit";
import categorySizeService from "../../services/categorySize.service";

const categorySizeSlice = createSlice({
	name: "categorySize",
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		dataLoaded: false,
	},
	reducers: {
		categorySizesRequested: (state) => {
			state.isLoading = true;
		},
		categorySizesReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.dataLoaded = true;
		},
		categorySizesRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: categorySizeReducer, actions } = categorySizeSlice;
const {
	categorySizesRequested,
	categorySizesReceived,
	categorySizesRequestFailed,
} = actions;

export const loadCategorySizes = () => async (dispatch) => {
	dispatch(categorySizesRequested());
	try {
		const { content } = await categorySizeService.get();
		dispatch(categorySizesReceived(content));
	} catch (error) {
		dispatch(categorySizesRequestFailed());
	}
};

export const getSizes = () => (state) => state.size.entities;
export const getSizeById = (sizeId) => (state) =>
	state.size.entities.find((s) => s._id === sizeId);
export const getLoadingStatusSize = () => (state) => state.size.isLoading;
export const getSizeExistStatus = () => (state) => state.size.dataLoaded;



export default categorySizeReducer;
