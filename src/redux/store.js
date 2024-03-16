import { combineReducers, createStore } from "redux";
import { nameReducer } from "./nameReducer";

const rootStore = combineReducers({
    count:nameReducer
})
export const store = createStore(rootStore)