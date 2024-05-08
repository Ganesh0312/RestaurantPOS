import { createStore, combineReducers, applyMiddleware } from "redux";
import { RootReducer } from "./RootReducer";

import { thunk } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

const FinalReducer = combineReducers({
  RootReducer,
});

const initialState = {
  RootReducer: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  FinalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
