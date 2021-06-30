import { createStore } from "redux";
import { appReducer } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(appReducer, composeWithDevTools());
store.subscribe(() => {
    const newState = store.getState();
    window.localStorage.setItem("notelia-state", JSON.stringify(newState));
});