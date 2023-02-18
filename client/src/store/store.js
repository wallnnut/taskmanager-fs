import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categorySizeReducer from "./slices/categorySize";
import categorySphereReducer from "./slices/categorySphere";
import prioritiesReducer from "./slices/priority";
import tasksReducer from "./slices/tasks";
import usersReducer from "./slices/user";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	size: categorySizeReducer,
	sphere: categorySphereReducer,
	priority: prioritiesReducer,
	user: usersReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
