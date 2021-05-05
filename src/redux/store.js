import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import logisticTableReducer from "./logisticTableReducer";


let reducers=combineReducers({
    logisticTable: logisticTableReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store;


export default store;