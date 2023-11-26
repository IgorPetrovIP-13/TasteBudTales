import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import constructorReducer from "../reducers/constructorReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  recipeConstructor: constructorReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export default store;