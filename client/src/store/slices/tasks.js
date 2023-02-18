import { createAction, createSlice } from "@reduxjs/toolkit";
import taskService from "../../services/task.service";
import { toast } from "react-toastify";
import localStorageService from "../../services/localStorage.service";
import { history } from "utils/history";

const userId = localStorageService.getUserId();

const tasksSlice = createSlice({
	name: "tasks",
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
		dataLoaded: false,
	},
	reducers: {
		tasksRequested: (state) => {
			state.isLoading = true;
		},
		tasksReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.dataLoaded = true;
			state.lastFetch = Date.now();
		},
		tasksRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		taskCreated: (state, action) => {
			if (!Array.isArray(state.entities)) {
				state.entities = [];
			}
			state.entities.push(action.payload);
		},
		taskCreateFailed: (state, action) => {
			state.error = action.payload;
		},
		taskEditFailed: (state, action) => {
			state.error = action.payload;
		},
		taskRemoved: (state, action) => {
			state.entities = state.entities.filter(
				(task) => task._id !== action.payload
			);
		},
		taskRemoveFailed: (state, action) => {
			state.error = action.payload;
		},
		taskEdited: (state, action) => {
			state.entities = state.entities.map((task) => {
				if (task._id === action.payload._id) {
					return {
						...task,
						...action.payload,
					};
				}
				return task;
			});
		},
	},
});
const taskCreateRequested = createAction("tasks/taskCreateRequested");
const taskDeleteRequested = createAction("tasks/taskDeleteRequested");
const taskEditRequested = createAction("tasks/taskEditRequested");

const { reducer: tasksReducer, actions } = tasksSlice;
const {
	tasksRequested,
	tasksReceived,
	tasksRequestFailed,
	taskCreated,
	taskCreateFailed,
	taskRemoved,
	taskRemoveFailed,
	taskEdited,
	taskEditFailed,
} = actions;

export const loadTaskList = () => async (dispatch) => {
	dispatch(tasksRequested());
	try {
		const { content } = await taskService.get();
		dispatch(tasksReceived(content));
	} catch (error) {
		dispatch(tasksRequestFailed(error.response.data.message));
	}
};

export const createTask = (data) => async (dispatch) => {
	dispatch(taskCreateRequested());
	const taskToPut = {
		...data,
		userId: userId,
	};
	try {
		const { content } = await taskService.create(taskToPut);
		dispatch(taskCreated(content));
		toast.success("Задача создана");
	} catch (error) {
		dispatch(taskCreateFailed(error.message));
	}
};

export const removeTask = (taskId) => async (dispatch) => {
	dispatch(taskDeleteRequested());
	try {
		const { content } = await taskService.remove(taskId);
		dispatch(taskRemoved(content._id));
		toast.warn("Задача удалена");
	} catch (error) {
		dispatch(taskRemoveFailed(error.message));
	}
};
export const editTask = (data) => async (dispatch) => {
	dispatch(taskEditRequested());
	try {
		const { content } = await taskService.edit(data);
		dispatch(taskEdited(content));
		if (Object.keys(data).length === 2) return;
		history.push("/projects");
	} catch (error) {
		dispatch(taskEditFailed(error.message));
	}
};

export const getTaskList = () => (state) => state.tasks.entities;
export const getIncompletedTasks = () => (state) =>
	state.tasks.dataLoaded
		? state.tasks.entities.filter((task) => task.completed === false)
		: null;
export const getLoadingStatusTasks = () => (state) => state.tasks.isLoading;
export const getTaskById = (id) => (state) =>
	state.tasks.entities.find((task) => task._id === id);
export const getTasksExistStatus = () => (state) => state.tasks.dataLoaded;
export const getCompletedTasks = () => (state) =>
	state.tasks.dataLoaded
		? state.tasks.entities.filter((task) => task.completed === true)
		: null;
export const getTaskErrors = () => (state) => state.tasks.error;

export default tasksReducer;
