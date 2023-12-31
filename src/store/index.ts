import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import reducers from "./reducers";
import { AuthAction } from "./reducers/auth/types";
import { EventAction } from "./reducers/event/types";

export type TApplicationActions =
    | AuthAction
    | EventAction

    
export const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

