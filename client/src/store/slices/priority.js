import { createSlice } from "@reduxjs/toolkit";
import priorityService from "../../services/priorities.servise";

const prioritySlice = createSlice({
	name: "priorities",
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		dataLoaded: false,
	},
	reducers: {
		prioritiesRequested: (state) => {
			state.isLoading = true;
		},
		prioritiesReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.dataLoaded = true;
		},
		prioritiesRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: prioritiesReducer, actions } = prioritySlice;
const { prioritiesRequested, prioritiesReceived, prioritiesRequestFailed } =
	actions;

export const loadPriorities = () => async (dispatch) => {
	dispatch(prioritiesRequested());
	try {
		const { content } = await priorityService.get();
		dispatch(prioritiesReceived(content));
	} catch (error) {
		dispatch(prioritiesRequestFailed());
	}
};

export const getPriorities = () => (state) => state.priority.entities;
export const getPriorityById = (priorityId) => (state) => {
	return state.priority.entities.find((pr) => pr._id === priorityId);
};
export const getLoadingStatusPriorities = () => (state) =>
	state.priority.isLoading;
export const getPriorityExistStatus = () => (state) =>
	state.priority.dataLoaded;

export default prioritiesReducer;
